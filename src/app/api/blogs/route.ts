import { NextResponse } from "next/server";
import { memoryBlogs } from "@/lib/data/cmsStore";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { normalizeBlogFromDb, isUuid } from "@/lib/cms-normalizer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      if (slug) {
        let query = supabase.from("blogs").select("*");
        if (isUuid(slug)) {
          query = query.or(`id.eq.${slug},slug.eq.${slug}`);
        } else {
          query = query.eq("slug", slug);
        }

        const { data, error } = await query.maybeSingle();

        if (error) {
          console.error("Supabase blog query error:", error);
        } else if (data) {
          const normalized = normalizeBlogFromDb(data);
          return NextResponse.json(
            { success: true, data: normalized },
            { headers: NO_CACHE_HEADERS }
          );
        }
      } else {
        const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        if (error) {
          console.error("Supabase blogs list query error:", error);
        } else if (data && data.length > 0) {
          const normalized = data.map(normalizeBlogFromDb);
          return NextResponse.json(
            { success: true, data: normalized },
            { headers: NO_CACHE_HEADERS }
          );
        }
      }
    } catch (e) {
      console.warn("Supabase fetch blogs error fallback:", e);
    }
  }

  if (slug) {
    const found = memoryBlogs.find((b) => b.slug === slug || b.id === slug);
    return NextResponse.json({ success: true, data: found || null }, { headers: NO_CACHE_HEADERS });
  }

  return NextResponse.json(
    { success: true, data: memoryBlogs },
    { headers: NO_CACHE_HEADERS }
  );
}
