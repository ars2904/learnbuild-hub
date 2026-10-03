import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { memoryWorkshops } from "@/lib/data/cmsStore";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        if (slug) {
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
          let query = supabase.from("workshops").select("*");
          if (isUuid) {
            query = query.or(`id.eq.${slug},slug.eq.${slug}`);
          } else {
            query = query.eq("slug", slug);
          }
          const { data, error } = await query.maybeSingle();
          if (!error && data) {
            return NextResponse.json(
              { success: true, data },
              { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
            );
          }
        } else {
          const { data, error } = await supabase
            .from("workshops")
            .select("*")
            .order("event_date", { ascending: true });
          if (!error && data && data.length > 0) {
            return NextResponse.json(
              { success: true, data },
              { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
            );
          }
        }
      } catch (e) {
        console.warn("Supabase fetch workshops error fallback to memory:", e);
      }
    }

    if (slug) {
      const found = memoryWorkshops.find((w) => w.slug === slug || w.id === slug);
      return NextResponse.json({ success: true, data: found || null });
    }

    return NextResponse.json(
      { success: true, data: memoryWorkshops },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
