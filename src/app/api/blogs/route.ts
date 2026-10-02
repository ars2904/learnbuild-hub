import { NextResponse } from "next/server";
import { memoryBlogs } from "@/lib/data/cmsStore";
import { getSupabaseAdminClient } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return NextResponse.json(
          { success: true, data },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          }
        );
      }
    } catch (e) {
      console.warn("Supabase fetch blogs error fallback:", e);
    }
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
