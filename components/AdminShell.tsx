import { Brand } from "./Brand";
import { BarChart3, CreditCard, Lock, Users } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-950 text-white">
    <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-white/10 bg-slate-950/90 p-6 md:block">
      <Brand />
      <nav className="mt-10 space-y-2 text-sm">
        <a className="flex items-center gap-3 rounded-2xl bg-lime px-4 py-3 font-bold text-ink"><BarChart3 size={18}/> Billing Dashboard</a>
        <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 hover:bg-white/10"><Users size={18}/> Members</a>
        <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 hover:bg-white/10"><CreditCard size={18}/> Charges</a>
        <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 hover:bg-white/10"><Lock size={18}/> Admin Access</a>
      </nav>
      <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
        Demo simulates Healthie GraphQL + Stripe billing logic with localStorage. Replace mock API handlers with live credentials in production.
      </div>
    </aside>
    <main className="md:pl-72">{children}</main>
  </div>
}
