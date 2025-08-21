
import Link from "next/link";
import { Sparkles, Image, Video, Plug } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-10">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          One API for Text · Image · Video
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Route across top models, generate images & videos, and extend with the MCP marketplace.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link className="btn btn-primary" href="/dashboard"><Sparkles size={18}/>Launch Console</Link>
          <Link className="btn" href="/docs">Read the Docs</Link>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {icon: Sparkles, title:"Chat & Tools", desc:"Unified /v1/chat for text + multimodal."},
          {icon: Image, title:"Image Generation", desc:"/v1/images/generate supports Flux/SD/DALL·E."},
          {icon: Video, title:"Video Generation", desc:"/v1/videos/generate via Runway/Kling/Luma."},
        ].map((c,i)=>(
          <div key={i} className="card p-6">
            <c.icon className="opacity-80 mb-3" />
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-400">{c.desc}</p>
          </div>
        ))}
      </section>
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-3">
          <Plug className="opacity-80" />
          <h3 className="font-semibold text-lg">MCP Marketplace</h3>
        </div>
        <p className="text-sm text-gray-400">
          Discover and install MCP servers safely. Fine-grained permissions, sandboxed egress, and usage metering.
        </p>
        <div className="mt-4">
          <Link className="btn" href="/dashboard#market">Explore in Console</Link>
        </div>
      </section>
    </div>
  );
}
