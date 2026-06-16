import Link from "next/link";
import { Brand } from "@/components/Brand";
import { ArrowRight, CreditCard, DatabaseZap, ShieldCheck } from "lucide-react";

export default function Home() {
  return <main className="min-h-screen bg-grid bg-ink">
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
      <header className="flex items-center justify-between"><Brand /><Link href="/admin" className="btn btn-secondary">Admin Console</Link></header>
      <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-lime/30 bg-lime/10 px-4 py-2 text-sm font-bold text-lime">Custom Healthie + Stripe signup flow</div>
          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">Youth athlete intake, payment, and billing admin — without the iframe.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">A polished prototype showing a custom React intake flow, Healthie profile creation simulation, branded interstitial, membership payment step, and internal billing console.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="btn btn-primary">Start signup <ArrowRight className="ml-2" size={18}/></Link><Link href="/admin" className="btn btn-secondary">View admin demo</Link></div>
        </div>
        <div className="card rounded-[2rem] p-6 shadow-2xl">
          <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between border-b pb-4"><div><p className="text-xs font-bold uppercase text-slate-500">Billing readiness</p><h3 className="text-2xl font-black">Member Operations</h3></div><div className="rounded-2xl bg-lime px-3 py-2 text-sm font-black">LIVE MOCK</div></div>
            <div className="mt-5 space-y-4">
              {[['Healthie API','createClient + tags','DatabaseZap'],['Stripe card storage','createStripeCustomerDetail','CreditCard'],['Billing control','createBillingItem + cron','ShieldCheck']].map((row, i) => {
                const Icon = i === 0 ? DatabaseZap : i === 1 ? CreditCard : ShieldCheck;
                return <div key={row[0]} className="flex items-center gap-4 rounded-2xl border bg-slate-50 p-4"><div className="rounded-xl bg-slate-950 p-3 text-lime"><Icon size={20}/></div><div><p className="font-black">{row[0]}</p><p className="text-sm text-slate-500">{row[1]}</p></div></div>
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
}
