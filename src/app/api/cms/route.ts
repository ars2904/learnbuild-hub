import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { verifyAdminRequest } from "@/lib/auth-server";
import { 
  memoryCourses, memorySolutions, memoryInstructors, memoryBlogs, memoryWorkshops, memorySiteSettings 
} from "@/lib/data/cmsStore";
import { 
  isUuid,
  normalizeBlogFromDb, normalizeBlogToDb,
  normalizeWorkshopFromDb, normalizeWorkshopToDb,
  normalizeCourseFromDb, normalizeCourseToDb,
  normalizeSolutionFromDb, normalizeSolutionToDb,
  normalizeInstructorFromDb, normalizeInstructorToDb,
  normalizeSiteSettingsFromDb, normalizeSiteSettingsToDb
} from "@/lib/cms-normalizer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";

    const supabase = getSupabaseAdminClient();

    if (type === "courses") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            const normalized = data.map(normalizeCourseFromDb);
            return NextResponse.json({ success: true, data: normalized }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch courses error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryCourses }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "solutions") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("solutions").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            const normalized = data.map(normalizeSolutionFromDb);
            return NextResponse.json({ success: true, data: normalized }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch solutions error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memorySolutions }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "instructors") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("instructors").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            const normalized = data.map(normalizeInstructorFromDb);
            return NextResponse.json({ success: true, data: normalized }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch instructors error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryInstructors }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "blogs") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            const normalized = data.map(normalizeBlogFromDb);
            return NextResponse.json({ success: true, data: normalized }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch blogs error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryBlogs }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "workshops") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("workshops").select("*").order("event_date", { ascending: true });
          if (!error && data && data.length > 0) {
            const normalized = data.map(normalizeWorkshopFromDb);
            return NextResponse.json({ success: true, data: normalized }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch workshops error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryWorkshops }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "settings") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("site_settings").select("*").single();
          if (!error && data) {
            const normalized = normalizeSiteSettingsFromDb(data);
            return NextResponse.json({ success: true, data: normalized }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch settings error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memorySiteSettings }, { headers: NO_CACHE_HEADERS });
    }

    // Fetch all for initial CMS page state
    let coursesData = memoryCourses;
    let solutionsData = memorySolutions;
    let instructorsData = memoryInstructors;
    let blogsData = memoryBlogs;
    let workshopsData = memoryWorkshops;
    let settingsData = memorySiteSettings;

    if (supabase) {
      try {
        const [cRes, sRes, iRes, bRes, wRes, stRes] = await Promise.all([
          supabase.from("courses").select("*").order("created_at", { ascending: false }),
          supabase.from("solutions").select("*").order("created_at", { ascending: false }),
          supabase.from("instructors").select("*").order("created_at", { ascending: false }),
          supabase.from("blogs").select("*").order("created_at", { ascending: false }),
          supabase.from("workshops").select("*").order("event_date", { ascending: true }),
          supabase.from("site_settings").select("*").single(),
        ]);

        if (!cRes.error && cRes.data && cRes.data.length > 0) coursesData = cRes.data.map(normalizeCourseFromDb);
        if (!sRes.error && sRes.data && sRes.data.length > 0) solutionsData = sRes.data.map(normalizeSolutionFromDb);
        if (!iRes.error && iRes.data && iRes.data.length > 0) instructorsData = iRes.data.map(normalizeInstructorFromDb);
        if (!bRes.error && bRes.data && bRes.data.length > 0) blogsData = bRes.data.map(normalizeBlogFromDb);
        if (!wRes.error && wRes.data && wRes.data.length > 0) workshopsData = wRes.data.map(normalizeWorkshopFromDb);
        if (!stRes.error && stRes.data) settingsData = normalizeSiteSettingsFromDb(stRes.data);
      } catch (e) {
        console.warn("Supabase fetch all content error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        courses: coursesData,
        solutions: solutionsData,
        instructors: instructorsData,
        blogs: blogsData,
        workshops: workshopsData,
        settings: settingsData,
      },
    }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    console.error("GET CMS route error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
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

    let returnedItem: any = { ...item };
    const supabase = getSupabaseAdminClient();

    if (type === "blogs") {
      const dbPayload = normalizeBlogToDb(item);
      if (supabase) {
        try {
          const { data, error } = await supabase.from("blogs").upsert(dbPayload).select();
          if (error) console.error("Supabase blog insert error:", error);
          else if (data && data.length > 0) returnedItem = normalizeBlogFromDb(data[0]);
        } catch (e) {
          console.warn("Supabase blog insert exception:", e);
        }
      }
      if (!returnedItem.id) returnedItem.id = `blog-${Date.now()}`;
      const existingIdx = memoryBlogs.findIndex(b => b.id === returnedItem.id || b.slug === returnedItem.slug);
      if (existingIdx !== -1) memoryBlogs[existingIdx] = returnedItem;
      else memoryBlogs.unshift(returnedItem);

    } else if (type === "workshops") {
      const dbPayload = normalizeWorkshopToDb(item);
      if (supabase) {
        try {
          const { data, error } = await supabase.from("workshops").upsert(dbPayload).select();
          if (error) console.error("Supabase workshop insert error:", error);
          else if (data && data.length > 0) returnedItem = normalizeWorkshopFromDb(data[0]);
        } catch (e) {
          console.warn("Supabase workshop insert exception:", e);
        }
      }
      if (!returnedItem.id) returnedItem.id = `workshop-${Date.now()}`;
      const existingIdx = memoryWorkshops.findIndex(w => w.id === returnedItem.id || w.slug === returnedItem.slug);
      if (existingIdx !== -1) memoryWorkshops[existingIdx] = returnedItem;
      else memoryWorkshops.unshift(returnedItem);

    } else if (type === "courses") {
      const dbPayload = normalizeCourseToDb(item);
      if (supabase) {
        try {
          const { data, error } = await supabase.from("courses").upsert(dbPayload).select();
          if (!error && data && data.length > 0) returnedItem = normalizeCourseFromDb(data[0]);
        } catch (e) { console.warn("Supabase courses insert exception:", e); }
      }
      if (!returnedItem.id) returnedItem.id = `course-${Date.now()}`;
      const existingIdx = memoryCourses.findIndex(c => c.id === returnedItem.id || c.slug === returnedItem.slug);
      if (existingIdx !== -1) memoryCourses[existingIdx] = returnedItem;
      else memoryCourses.unshift(returnedItem);

    } else if (type === "solutions") {
      const dbPayload = normalizeSolutionToDb(item);
      if (supabase) {
        try {
          const { data, error } = await supabase.from("solutions").upsert(dbPayload).select();
          if (!error && data && data.length > 0) returnedItem = normalizeSolutionFromDb(data[0]);
        } catch (e) { console.warn("Supabase solutions insert exception:", e); }
      }
      if (!returnedItem.id) returnedItem.id = `sol-${Date.now()}`;
      const existingIdx = memorySolutions.findIndex(s => s.id === returnedItem.id);
      if (existingIdx !== -1) memorySolutions[existingIdx] = returnedItem;
      else memorySolutions.unshift(returnedItem);

    } else if (type === "instructors") {
      const dbPayload = normalizeInstructorToDb(item);
      if (supabase) {
        try {
          const { data, error } = await supabase.from("instructors").upsert(dbPayload).select();
          if (!error && data && data.length > 0) returnedItem = normalizeInstructorFromDb(data[0]);
        } catch (e) { console.warn("Supabase instructors insert exception:", e); }
      }
      if (!returnedItem.id) returnedItem.id = `inst-${Date.now()}`;
      const existingIdx = memoryInstructors.findIndex(i => i.id === returnedItem.id);
      if (existingIdx !== -1) memoryInstructors[existingIdx] = returnedItem;
      else memoryInstructors.unshift(returnedItem);
    }

    return NextResponse.json({ success: true, data: returnedItem }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
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

    const supabase = getSupabaseAdminClient();

    if (type === "settings" && settings) {
      const normalizedSettings = normalizeSiteSettingsFromDb(settings);
      Object.assign(memorySiteSettings, normalizedSettings);

      if (supabase) {
        try {
          const dbPayload = normalizeSiteSettingsToDb(settings);
          await supabase.from("site_settings").upsert(dbPayload);
        } catch (e) {
          console.warn("Supabase update settings error:", e);
        }
      }

      return NextResponse.json({ success: true, data: memorySiteSettings }, { headers: NO_CACHE_HEADERS });
    }

    if (!type || !item) {
      return NextResponse.json({ success: false, message: "Type and item required." }, { status: 400 });
    }

    let returnedItem: any = { ...item };

    if (type === "blogs") {
      const dbPayload = normalizeBlogToDb(item);
      if (supabase) {
        try {
          let res;
          if (isUuid(item.id)) {
            res = await supabase.from("blogs").update(dbPayload).eq("id", item.id).select();
          } else if (item.slug) {
            res = await supabase.from("blogs").update(dbPayload).eq("slug", item.slug).select();
          } else {
            res = await supabase.from("blogs").upsert(dbPayload).select();
          }
          if (res && !res.error && res.data && res.data.length > 0) {
            returnedItem = normalizeBlogFromDb(res.data[0]);
          }
        } catch (e) {
          console.warn("Supabase blog update exception:", e);
        }
      }
      const idx = memoryBlogs.findIndex((b) => b.id === item.id || b.slug === item.slug);
      if (idx !== -1) memoryBlogs[idx] = { ...memoryBlogs[idx], ...returnedItem };

    } else if (type === "workshops") {
      const dbPayload = normalizeWorkshopToDb(item);
      if (supabase) {
        try {
          let res;
          if (isUuid(item.id)) {
            res = await supabase.from("workshops").update(dbPayload).eq("id", item.id).select();
          } else if (item.slug) {
            res = await supabase.from("workshops").update(dbPayload).eq("slug", item.slug).select();
          } else {
            res = await supabase.from("workshops").upsert(dbPayload).select();
          }
          if (res && !res.error && res.data && res.data.length > 0) {
            returnedItem = normalizeWorkshopFromDb(res.data[0]);
          }
        } catch (e) {
          console.warn("Supabase workshop update exception:", e);
        }
      }
      const idx = memoryWorkshops.findIndex((w) => w.id === item.id || w.slug === item.slug);
      if (idx !== -1) memoryWorkshops[idx] = { ...memoryWorkshops[idx], ...returnedItem };

    } else if (type === "courses") {
      const dbPayload = normalizeCourseToDb(item);
      if (supabase) {
        try {
          let res;
          if (isUuid(item.id)) {
            res = await supabase.from("courses").update(dbPayload).eq("id", item.id).select();
          } else if (item.slug) {
            res = await supabase.from("courses").update(dbPayload).eq("slug", item.slug).select();
          } else {
            res = await supabase.from("courses").upsert(dbPayload).select();
          }
          if (res && !res.error && res.data && res.data.length > 0) returnedItem = normalizeCourseFromDb(res.data[0]);
        } catch (e) { console.warn("Supabase course update exception:", e); }
      }
      const idx = memoryCourses.findIndex((c) => c.id === item.id || c.slug === item.slug);
      if (idx !== -1) memoryCourses[idx] = { ...memoryCourses[idx], ...returnedItem };

    } else if (type === "solutions") {
      const dbPayload = normalizeSolutionToDb(item);
      if (supabase) {
        try {
          const res = await supabase.from("solutions").upsert(dbPayload).select();
          if (res && !res.error && res.data && res.data.length > 0) returnedItem = normalizeSolutionFromDb(res.data[0]);
        } catch (e) { console.warn("Supabase solution update exception:", e); }
      }
      const idx = memorySolutions.findIndex((s) => s.id === item.id);
      if (idx !== -1) memorySolutions[idx] = { ...memorySolutions[idx], ...returnedItem };

    } else if (type === "instructors") {
      const dbPayload = normalizeInstructorToDb(item);
      if (supabase) {
        try {
          const res = await supabase.from("instructors").upsert(dbPayload).select();
          if (res && !res.error && res.data && res.data.length > 0) returnedItem = normalizeInstructorFromDb(res.data[0]);
        } catch (e) { console.warn("Supabase instructor update exception:", e); }
      }
      const idx = memoryInstructors.findIndex((i) => i.id === item.id);
      if (idx !== -1) memoryInstructors[idx] = { ...memoryInstructors[idx], ...returnedItem };
    }

    return NextResponse.json({ success: true, data: returnedItem }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
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

    // Memory Store deletion
    if (type === "courses") {
      const idx = memoryCourses.findIndex((c) => c.id === id || c.slug === id);
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
    } else if (type === "workshops") {
      const idx = memoryWorkshops.findIndex((w) => w.id === id || w.slug === id);
      if (idx !== -1) memoryWorkshops.splice(idx, 1);
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        if (isUuid(id)) {
          await supabase.from(type).delete().eq("id", id);
        } else {
          // If ID is not UUID, delete by slug if table supports slug, else by id
          if (type === "blogs" || type === "workshops" || type === "courses") {
            await supabase.from(type).delete().or(`id.eq.${id},slug.eq.${id}`);
          } else {
            await supabase.from(type).delete().eq("id", id);
          }
        }
      } catch (e) {
        console.warn(`Supabase delete from ${type} error:`, e);
      }
    }

    return NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
