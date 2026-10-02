import { NextResponse } from "next/server";
import { memoryBlogs } from "@/lib/data/cmsStore";
import { getSupabaseAdminClient } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      if (slug) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
        let query = supabase.from("blogs").select("*");
        
        if (isUuid) {
          query = query.or(`id.eq.${slug},slug.eq.${slug}`);
        } else {
          query = query.eq("slug", slug);
        }

        const { data, error } = await query.maybeSingle();

        if (error) {
          console.error("Supabase blog query error:", error);
        } else if (data) {
          return NextResponse.json(
            { success: true, data },
            {
              headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            }
          );
        }
      } else {
        const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        if (error) {
          console.error("Supabase blogs list query error:", error);
        } else if (data) {
          return NextResponse.json(
            { success: true, data },
            {
              headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            }
          );
        }
      }
    } catch (e) {
      console.warn("Supabase fetch blogs error fallback:", e);
    }
  }

  if (slug) {
    const found = memoryBlogs.find((b) => b.slug === slug || b.id === slug);
    return NextResponse.json({ success: true, data: found || null });
  }

  return NextResponse.json(
    { success: true, data: memoryBlogs },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}
