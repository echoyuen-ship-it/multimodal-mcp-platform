
import { supabaseServer } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return Response.json({ ok:false }, { status:401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if(!id) return Response.json({ ok:false }, { status:400 });
  const { error } = await supabase.from("api_keys").delete().eq("id", id).eq("user_id", user.id);
  if(error) return Response.json({ ok:false, error: error.message }, { status: 500 });
  return Response.json({ ok:true });
}
