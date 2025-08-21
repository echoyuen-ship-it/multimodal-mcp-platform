
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseBrowser";

type KeyRow = { id: string; label: string; secret_prefix: string; created_at: string; };

export default function DashboardPage(){
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<'keys'|'playground'|'market'>('keys');

  useEffect(()=>{
    supabase.auth.getSession().then(({ data })=> setSession(data.session));
  },[]);

  if(!session) return (
    <div className="text-center">
      <p>Please <Link className="underline" href="/login">login</Link> to use the console.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Console</h1>
      <div className="flex gap-2">
        <button onClick={()=>setTab('keys')} className={`btn ${tab==='keys'?'btn-primary':''}`}>API Keys</button>
        <button onClick={()=>setTab('playground')} className={`btn ${tab==='playground'?'btn-primary':''}`}>Playground</button>
        <button id="market" onClick={()=>setTab('market')} className={`btn ${tab==='market'?'btn-primary':''}`}>MCP Market</button>
      </div>
      {tab==='keys' && <KeysTab />}
      {tab==='playground' && <PlaygroundTab />}
      {tab==='market' && <MarketTab />}
    </div>
  );
}

function KeysTab(){
  const [rows, setRows] = useState<KeyRow[]>([]);
  const [label, setLabel] = useState("");

  const load = async ()=>{
    const res = await fetch("/api/keys/list", {cache:'no-store'});
    const data = await res.json();
    setRows(data.rows || []);
  };
  useEffect(()=>{ load(); },[]);

  const createKey = async ()=>{
    const res = await fetch("/api/keys/create", { method: "POST", body: JSON.stringify({ label })});
    await load();
  };
  const revoke = async (id:string)=>{
    await fetch("/api/keys/revoke?id="+encodeURIComponent(id), { method: "POST"});
    await load();
  };

  return (
    <div className="card p-6">
      <h2 className="font-semibold mb-4">Your API Keys</h2>
      <div className="flex gap-2">
        <input placeholder="Label (e.g. staging)" value={label} onChange={e=>setLabel(e.target.value)} />
        <button className="btn btn-primary" onClick={createKey}>Create</button>
      </div>
      <table className="w-full text-sm mt-4">
        <thead><tr className="text-left text-gray-400">
          <th className="py-2">Label</th><th>Secret</th><th>Created</th><th></th>
        </tr></thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.id} className="border-t border-white/5">
              <td className="py-2">{r.label}</td>
              <td>{r.secret_prefix}••••••••</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td className="text-right"><button onClick={()=>revoke(r.id)} className="btn">Revoke</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlaygroundTab(){
  const [subtab, setSubtab] = useState<'chat'|'image'|'video'>('chat');
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={()=>setSubtab('chat')} className={`btn ${subtab==='chat'?'btn-primary':''}`}>Chat</button>
        <button onClick={()=>setSubtab('image')} className={`btn ${subtab==='image'?'btn-primary':''}`}>Image</button>
        <button onClick={()=>setSubtab('video')} className={`btn ${subtab==='video'?'btn-primary':''}`}>Video</button>
      </div>
      {subtab==='chat' && <ChatPlayground/>}
      {subtab==='image' && <ImagePlayground/>}
      {subtab==='video' && <VideoPlayground/>}
    </div>
  );
}

function ChatPlayground(){
  const [prompt, setPrompt] = useState("Explain MCP in one paragraph");
  const [model, setModel] = useState("gpt-4o-mini");
  const [out, setOut] = useState<string>("");

  const run = async ()=>{
    setOut("...");
    const res = await fetch("/api/chat", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model, messages:[{role:'user', content: prompt}] })});
    const data = await res.json();
    setOut(data.output || JSON.stringify(data, null, 2));
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-2">
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="flex-1" />
        <select value={model} onChange={e=>setModel(e.target.value)}>
          <option>gpt-4o-mini</option>
          <option>gpt-4o</option>
          <option>claude-3.5-sonnet</option>
        </select>
        <button className="btn btn-primary" onClick={run}>Run</button>
      </div>
      <pre className="bg-black/50 p-3 rounded-xl text-sm overflow-auto min-h-[120px]">{out}</pre>
    </div>
  );
}

function ImagePlayground(){
  const [prompt, setPrompt] = useState("a cozy cabin in the woods, cinematic lighting");
  const [model, setModel] = useState("flux-1.1");
  const [img, setImg] = useState<string|undefined>();

  const run = async ()=>{
    setImg(undefined);
    const res = await fetch("/api/images/generate", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model, prompt, size:"1024x1024" })});
    const data = await res.json();
    setImg(data.image_base64 ? "data:image/png;base64,"+data.image_base64 : undefined);
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-2">
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="flex-1" />
        <select value={model} onChange={e=>setModel(e.target.value)}>
          <option>flux-1.1</option>
          <option>sdxl</option>
          <option>dall-e-3</option>
        </select>
        <button className="btn btn-primary" onClick={run}>Generate</button>
      </div>
      {img && <img src={img} alt="generated" className="rounded-xl border border-white/10" />}
    </div>
  );
}

function VideoPlayground(){
  const [prompt, setPrompt] = useState("a drone fly-through over a neon city at night");
  const [model, setModel] = useState("runway-gen3");
  const [status, setStatus] = useState<string>("");

  const run = async ()=>{
    setStatus("Submitting...");
    const res = await fetch("/api/videos/generate", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model, prompt, duration:5, resolution:"720p" })});
    const data = await res.json();
    setStatus(data.status || JSON.stringify(data, null, 2));
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-2">
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="flex-1" />
        <select value={model} onChange={e=>setModel(e.target.value)}>
          <option>runway-gen3</option>
          <option>kling-v1</option>
          <option>luma-ray</option>
        </select>
        <button className="btn btn-primary" onClick={run}>Generate</button>
      </div>
      <p className="text-sm text-gray-400">{status}</p>
    </div>
  );
}

function MarketTab(){
  const [items, setItems] = useState<any[]>([]);
  const [installs, setInstalls] = useState<Record<string, boolean>>({});

  useEffect(()=>{
    fetch("/api/mcp/list").then(r=>r.json()).then(d=>setItems(d.items||[]));
    fetch("/api/mcp/installs").then(r=>r.json()).then(d=>setInstalls(d.installs||{}));
  },[]);

  const toggle = async (id:string)=>{
    const t = !installs[id];
    setInstalls(s=>({...s, [id]: t}));
    await fetch("/api/mcp/toggle", { method:"POST", body: JSON.stringify({ id, install: t })});
  };

  return (
    <div className="card p-6">
      <h2 className="font-semibold mb-4">MCP Marketplace</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(it=>(
          <div key={it.id} className="border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{it.name}</h3>
                <p className="text-xs text-gray-400">{it.desc}</p>
                <p className="text-xs text-gray-500 mt-1">Scopes: {it.scopes.join(", ")}</p>
              </div>
              <button className={"btn "+(installs[it.id]?"btn-primary":"")} onClick={()=>toggle(it.id)}>
                {installs[it.id] ? "Installed" : "Install"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
