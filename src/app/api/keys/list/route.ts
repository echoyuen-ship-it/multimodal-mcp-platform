
import { supabaseServer } from "@/lib/supabase";

export async function GET(){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return Response.json({ rows: [] }, { status: 200 });
  const { data, error } = await supabase.from("api_keys").select("id,label,secret_prefix,created_at").eq("user_id", user.id).order("created_at", { ascending: false });
  return Response.json({ rows: data||[] });
}
