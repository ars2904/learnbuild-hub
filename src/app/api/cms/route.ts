import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { verifyAdminRequest } from "@/lib/auth-server";
import { 
  memoryCourses, memorySolutions, memoryInstructors, memoryBlogs, memorySiteSettings,
  CMSCourse, CMSSolution, CMSInstructor, CMSBlog, CMSSiteSettings
} from "@/lib/data/cmsStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";

    const supabase = getSupabaseAdminClient();

    if (type === "courses") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) return NextResponse.json({ success: true, data });
        } catch (e) {
          console.warn("Supabase fetch courses error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryCourses });
    }

    if (type === "solutions") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("solutions").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) return NextResponse.json({ success: true, data });
        } catch (e) {
          console.warn("Supabase fetch solutions error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memorySolutions });
    }

    if (type === "instructors") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("instructors").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) return NextResponse.json({ success: true, data });
        } catch (e) {
          console.warn("Supabase fetch instructors error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryInstructors });
    }

    if (type === "blogs") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) return NextResponse.json({ success: true, data });
        } catch (e) {
          console.warn("Supabase fetch blogs error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryBlogs });
    }

    if (type === "settings") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("site_settings").select("*").single();
          if (!error && data) return NextResponse.json({ success: true, data });
        } catch (e) {
          console.warn("Supabase fetch settings error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memorySiteSettings });
    }

    return NextResponse.json({
      success: true,
      data: {
        courses: memoryCourses,
        solutions: memorySolutions,
        instructors: memoryInstructors,
        blogs: memoryBlogs,
        settings: memorySiteSettings,
      },
    });
  } catch (err: any) {
    console.error("GET CMS route error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authCheck = await verifyAdminRequest(request);
    if (!authCheck.authorized) {
      return authCheck.errorResponse!;
    }

    const body = await request.json();
    const { type, item } = body;

    if (!type || !item) {
      return NextResponse.json({ success: false, message: "Type and item are required." }, { status: 400 });
    }

    let newItem: any = { ...item, id: item.id || `item-${Date.now()}` };

    if (type === "courses") {
      memoryCourses.unshift(newItem);
    } else if (type === "solutions") {
      memorySolutions.unshift(newItem);
    } else if (type === "instructors") {
      memoryInstructors.unshift(newItem);
    } else if (type === "blogs") {
      memoryBlogs.unshift(newItem);
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        if (type === "blogs") {
          const isUuid = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
          const blogPayload = {
            ...(isUuid(newItem.id) ? { id: newItem.id } : {}),
            slug: newItem.slug || newItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            title: newItem.title,
            excerpt: newItem.excerpt || "",
            content: newItem.content || "",
            category: newItem.category || "Engineering",
            author_name: newItem.authorName || newItem.author_name || "LearnBuild Hub Tech Team",
            author_avatar: newItem.authorAvatar || newItem.author_avatar || null,
            cover_image: newItem.coverImage || newItem.cover_image || newItem.image || null,
            read_time: newItem.readTime || newItem.read_time || "5 min read",
            external_url: newItem.externalUrl || newItem.external_url || null,
            published_at: newItem.publishedAt || newItem.published_at || new Date().toISOString(),
            featured: Boolean(newItem.featured),
          };
          const { data, error } = await supabase.from("blogs").upsert(blogPayload).select();
          if (error) {
            console.error("Supabase blog insert error:", error);
          } else if (data && data.length > 0) {
            newItem = { ...newItem, ...data[0] };
          }
        } else {
          await supabase.from(type).insert([newItem]);
        }
      } catch (e) {
        console.warn(`Supabase insert into ${type} error:`, e);
      }
    }

    return NextResponse.json({ success: true, data: newItem });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authCheck = await verifyAdminRequest(request);
    if (!authCheck.authorized) {
      return authCheck.errorResponse!;
    }

    const body = await request.json();
    const { type, item, settings } = body;

    if (type === "settings" && settings) {
      Object.assign(memorySiteSettings, settings);

      const supabase = getSupabaseAdminClient();
      if (supabase) {
        try {
          await supabase.from("site_settings").upsert(settings);
        } catch (e) {
          console.warn("Supabase update settings error:", e);
        }
      }

      return NextResponse.json({ success: true, data: memorySiteSettings });
    }

    if (!type || !item || !item.id) {
      return NextResponse.json({ success: false, message: "Type and item with ID required." }, { status: 400 });
    }

    if (type === "courses") {
      const idx = memoryCourses.findIndex((c) => c.id === item.id);
      if (idx !== -1) memoryCourses[idx] = { ...memoryCourses[idx], ...item };
    } else if (type === "solutions") {
      const idx = memorySolutions.findIndex((s) => s.id === item.id);
      if (idx !== -1) memorySolutions[idx] = { ...memorySolutions[idx], ...item };
    } else if (type === "instructors") {
      const idx = memoryInstructors.findIndex((i) => i.id === item.id);
      if (idx !== -1) memoryInstructors[idx] = { ...memoryInstructors[idx], ...item };
    } else if (type === "blogs") {
      const idx = memoryBlogs.findIndex((b) => b.id === item.id);
      if (idx !== -1) memoryBlogs[idx] = { ...memoryBlogs[idx], ...item };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        if (type === "blogs") {
          const isUuid = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
          const blogPayload = {
            ...(isUuid(item.id) ? { id: item.id } : {}),
            slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            title: item.title,
            excerpt: item.excerpt || "",
            content: item.content || "",
            category: item.category || "Engineering",
            author_name: item.authorName || item.author_name || "LearnBuild Hub Tech Team",
            author_avatar: item.authorAvatar || item.author_avatar || null,
            cover_image: item.coverImage || item.cover_image || item.image || null,
            read_time: item.readTime || item.read_time || "5 min read",
            external_url: item.externalUrl || item.external_url || null,
            published_at: item.publishedAt || item.published_at || new Date().toISOString(),
            featured: Boolean(item.featured),
          };

          if (isUuid(item.id)) {
            await supabase.from("blogs").update(blogPayload).eq("id", item.id);
          } else if (item.slug) {
            await supabase.from("blogs").update(blogPayload).eq("slug", item.slug);
          } else {
            await supabase.from("blogs").upsert(blogPayload);
          }
        } else {
          await supabase.from(type).update(item).eq("id", item.id);
        }
      } catch (e) {
        console.warn(`Supabase update ${type} error:`, e);
      }
    }

    return NextResponse.json({ success: true, data: item });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authCheck = await verifyAdminRequest(request);
    if (!authCheck.authorized) {
      return authCheck.errorResponse!;
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json({ success: false, message: "Type and ID required." }, { status: 400 });
    }

    if (type === "courses") {
      const idx = memoryCourses.findIndex((c) => c.id === id);
      if (idx !== -1) memoryCourses.splice(idx, 1);
    } else if (type === "solutions") {
      const idx = memorySolutions.findIndex((s) => s.id === id);
      if (idx !== -1) memorySolutions.splice(idx, 1);
    } else if (type === "instructors") {
      const idx = memoryInstructors.findIndex((i) => i.id === id);
      if (idx !== -1) memoryInstructors.splice(idx, 1);
    } else if (type === "blogs") {
      const idx = memoryBlogs.findIndex((b) => b.id === id || b.slug === id);
      if (idx !== -1) memoryBlogs.splice(idx, 1);
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        if (type === "blogs") {
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
          if (isUuid) {
            await supabase.from("blogs").delete().eq("id", id);
          } else {
            await supabase.from("blogs").delete().eq("slug", id);
          }
        } else {
          await supabase.from(type).delete().eq("id", id);
        }
      } catch (e) {
        console.warn(`Supabase delete from ${type} error:`, e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
