
import { supabaseServer } from "@/lib/supabase";

export async function GET(){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return Response.json({ installs: {} });
  const { data } = await supabase.from("mcp_installs").select("server_id").eq("user_id", user.id);
  const installs: Record<string, boolean> = {};
  for(const r of (data||[])){ installs[r.server_id] = true; }
  return Response.json({ installs });
}
