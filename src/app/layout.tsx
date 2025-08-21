
import "./../styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">Multimodal Router</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/docs">Docs</Link>
              <Link href="/dashboard">Console</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-400">
          © {new Date().getFullYear()} Multimodal Router · MCP Marketplace
        </footer>
      </body>
    </html>
  );
}
