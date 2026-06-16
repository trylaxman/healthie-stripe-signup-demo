"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { StepNav } from "@/components/StepNav";
import { getCurrentClient, updateClient } from "@/lib/storage";
import { tiers } from "@/lib/pricing";
import { AthleteClient, MembershipTier } from "@/lib/types";
import { CheckCircle2, CreditCard } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [client, setClient] = useState<AthleteClient | null>(null);
  const [tier, setTier] = useState<MembershipTier>("annual");
  const [loading, setLoading] = useState(false);

  useEffect(() => { setClient(getCurrentClient()); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!client) return;
    setLoading(true);
    await fetch("/api/stripe/store-card", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: client.user_id, card_last4: "4242" }) });
    await fetch("/api/healthie/tag-membership", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: client.user_id, tier }) });
    updateClient(client.user_id, { membershipTier: tier, stripeCustomerId: `cus_mock_${client.user_id.toLowerCase()}`, billingDate: "2026-07-01", status: "active" });
    router.push("/signup/success");
  }

  return <main className="min-h-screen bg-grid bg-ink px-6 py-8">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4"><Brand /><StepNav active={2}/></header>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
          <p className="text-sm font-black uppercase text-slate-500">Healthie user_id: {client?.user_id || "USR-MOCK"}</p>
          <h1 className="mt-2 text-4xl font-black">Choose membership</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(Object.keys(tiers) as MembershipTier[]).map((key) => <button type="button" onClick={() => setTier(key)} key={key} className={`rounded-3xl border p-5 text-left transition ${tier === key ? "border-slate-950 bg-slate-950 text-white" : "bg-slate-50 hover:bg-slate-100"}`}>
              <div className="flex justify-between"><h3 className="text-xl font-black">{tiers[key].name}</h3>{tier === key && <CheckCircle2 className="text-lime"/>}</div>
              <p className="mt-2 text-3xl font-black">{tiers[key].label}</p>
              <p className={`mt-3 text-sm ${tier === key ? "text-slate-300" : "text-slate-500"}`}>{tiers[key].description}</p>
            </button>)}
          </div>
          <div className="mt-6 rounded-3xl border bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-2 font-black"><CreditCard size={20}/> Card details</div>
            <div className="grid gap-4 md:grid-cols-[1fr_.45fr_.35fr]">
              <input className="input" value="4242 4242 4242 4242" readOnly />
              <input className="input" value="12/30" readOnly />
              <input className="input" value="123" readOnly />
            </div>
            <p className="mt-3 text-xs text-slate-500">Demo card form. Production implementation would use Stripe Elements or existing secure card-capture page.</p>
          </div>
          <button disabled={loading || !client} className="btn btn-primary mt-6 w-full">{loading ? "Storing card and tagging Healthie profile..." : "Save payment method and activate membership"}</button>
        </form>
        <div className="card rounded-[2rem] p-7">
          <p className="text-sm font-bold uppercase text-lime">Payment step logic</p>
          <h2 className="mt-3 text-3xl font-black">Two API calls after submit</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><b className="text-white">1. createStripeCustomerDetail</b><br/>Stores payment method against the Healthie profile/customer.</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><b className="text-white">2. Healthie membership tag</b><br/>Applies Annual / 6-Month / 3-Month tier to patient profile.</div>
            <div className="rounded-2xl border border-lime/20 bg-lime/10 p-4 text-lime"><b>Reliability note:</b> Production should include idempotency keys, retry-safe APIs, and clear error recovery.</div>
          </div>
        </div>
      </div>
    </div>
  </main>
}
