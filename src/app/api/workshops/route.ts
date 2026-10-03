import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { memoryWorkshops, INITIAL_WORKSHOPS, deletedWorkshops } from "@/lib/data/cmsStore";
import { normalizeWorkshopFromDb, isUuid } from "@/lib/cms-normalizer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        if (slug) {
          let query = supabase.from("workshops").select("*");
          if (isUuid(slug)) {
            query = query.or(`id.eq.${slug},slug.eq.${slug}`);
          } else {
            query = query.eq("slug", slug);
          }
          const { data, error } = await query.maybeSingle();
          if (!error && data) {
            const normalized = normalizeWorkshopFromDb(data);
            return NextResponse.json(
              { success: true, data: normalized },
              { headers: NO_CACHE_HEADERS }
            );
          }
          const foundMem = INITIAL_WORKSHOPS.find(
            (w) => (w.slug === slug || w.id === slug) && !deletedWorkshops.has(w.id) && !deletedWorkshops.has(w.slug)
          );
          if (foundMem) {
            return NextResponse.json({ success: true, data: foundMem }, { headers: NO_CACHE_HEADERS });
          }
        } else {
          const { data, error } = await supabase
            .from("workshops")
            .select("*")
            .order("event_date", { ascending: true });
          if (!error && data) {
            const dbNormalized = data.map(normalizeWorkshopFromDb);
            const existingSlugs = new Set(dbNormalized.map((w) => w.slug));
            const existingIds = new Set(dbNormalized.map((w) => w.id));
            const missingInitial = INITIAL_WORKSHOPS.filter(
              (iw) => !existingSlugs.has(iw.slug) && !existingIds.has(iw.id) && !deletedWorkshops.has(iw.id) && !deletedWorkshops.has(iw.slug)
            );
            const combined = [...dbNormalized, ...missingInitial];
            return NextResponse.json(
              { success: true, data: combined },
              { headers: NO_CACHE_HEADERS }
            );
          }
        }
      } catch (e) {
        console.warn("Supabase fetch workshops error fallback to memory:", e);
      }
    }

    if (slug) {
      const found = memoryWorkshops.find((w) => w.slug === slug || w.id === slug);
      return NextResponse.json({ success: true, data: found || null }, { headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json(
      { success: true, data: memoryWorkshops },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
