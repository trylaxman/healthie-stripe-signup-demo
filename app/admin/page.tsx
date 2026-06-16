"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { addBillingEvent, getBillingEvents, getClients, updateClient } from "@/lib/storage";
import { AthleteClient, BillingEvent } from "@/lib/types";
import { tiers } from "@/lib/pricing";
import { CreditCard, Lock, RefreshCcw, Search, Zap } from "lucide-react";

function eventFor(client: AthleteClient, source: BillingEvent["source"]): BillingEvent {
  const tier = client.membershipTier || "annual";
  const shouldFail = client.status === "past_due" && source !== "manual";
  return {
    id: `BILL-${Math.floor(Math.random() * 90000 + 10000)}`,
    user_id: client.user_id,
    memberName: `${client.firstName} ${client.lastName}`,
    tier,
    amount: tiers[tier].amount,
    status: shouldFail ? "failed" : "succeeded",
    createdAt: new Date().toISOString(),
    source,
    note: shouldFail ? "Mock card failure. Retry/payment update needed." : "Mock Healthie createBillingItem processed"
  };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [clients, setClients] = useState<AthleteClient[]>([]);
  const [events, setEvents] = useState<BillingEvent[]>([]);
  const [query, setQuery] = useState("");

  function refresh() { setClients(getClients()); setEvents(getBillingEvents()); }
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => clients.filter(c => `${c.firstName} ${c.lastName} ${c.parentEmail}`.toLowerCase().includes(query.toLowerCase())), [clients, query]);

  function login(e: React.FormEvent) { e.preventDefault(); if (password === "admin123") setUnlocked(true); }

  async function chargeMember(client: AthleteClient, source: BillingEvent["source"] = "manual") {
    await fetch("/api/billing/charge-member", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: client.user_id, source }) });
    const event = eventFor(client, source);
    addBillingEvent(event);
    if (event.status === "succeeded") updateClient(client.user_id, { status: "active", billingDate: "2026-08-01" }); else updateClient(client.user_id, { status: "past_due" });
    refresh();
  }

  async function chargeAll(source: BillingEvent["source"] = "bulk") {
    await fetch("/api/billing/charge-all", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source }) });
    clients.forEach((client) => {
      const event = eventFor(client, source);
      addBillingEvent(event);
      if (event.status === "succeeded") updateClient(client.user_id, { status: "active", billingDate: "2026-08-01" }); else updateClient(client.user_id, { status: "past_due" });
    });
    refresh();
  }

  if (!unlocked) return <main className="flex min-h-screen items-center justify-center bg-grid bg-ink px-6">
    <form onSubmit={login} className="w-full max-w-md rounded-[2rem] bg-white p-8 text-slate-950 shadow-2xl">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-lime"><Lock /></div>
      <h1 className="text-center text-3xl font-black">Admin console</h1>
      <p className="mt-2 text-center text-slate-500">Password-protected billing operations dashboard.</p>
      <label className="mt-6 block text-sm font-bold">Password</label>
      <input className="input mt-2" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="admin123" />
      <button className="btn btn-primary mt-5 w-full">Unlock console</button>
    </form>
  </main>;

  const active = clients.filter(c => c.status === "active").length;
  const monthly = clients.reduce((sum, c) => sum + (c.membershipTier ? tiers[c.membershipTier].amount : 0), 0);

  return <AdminShell>
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm font-bold uppercase text-lime">Internal billing console</p><h1 className="mt-2 text-4xl font-black">Healthie member billing</h1><p className="mt-2 text-slate-400">Pulls mock patient data from Healthie GraphQL and processes mock createBillingItem charges.</p></div>
        <div className="flex flex-wrap gap-3"><button onClick={()=>chargeAll("scheduled")} className="btn btn-secondary"><RefreshCcw className="mr-2" size={18}/> Run scheduled billing</button><button onClick={()=>chargeAll("bulk")} className="btn btn-primary"><Zap className="mr-2" size={18}/> Charge All Now</button></div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="card rounded-3xl p-5"><p className="text-sm text-slate-400">Active members</p><p className="mt-2 text-4xl font-black">{active}</p></div>
        <div className="card rounded-3xl p-5"><p className="text-sm text-slate-400">Projected monthly billing</p><p className="mt-2 text-4xl font-black">${monthly}</p></div>
        <div className="card rounded-3xl p-5"><p className="text-sm text-slate-400">Recent billing events</p><p className="mt-2 text-4xl font-black">{events.length}</p></div>
      </div>

      <div className="mt-8 rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"><h2 className="text-2xl font-black">Members</h2><div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2"><Search size={16}/><input className="bg-transparent outline-none" placeholder="Search member" value={query} onChange={(e)=>setQuery(e.target.value)}/></div></div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500"><tr><th className="py-3">Member</th><th>Tier</th><th>Billing Date</th><th>Status</th><th>Stripe</th><th className="text-right">Actions</th></tr></thead>
            <tbody className="divide-y">
              {filtered.map(client => <tr key={client.user_id}>
                <td className="py-4"><p className="font-black">{client.firstName} {client.lastName}</p><p className="text-xs text-slate-500">{client.parentEmail} · {client.user_id}</p></td>
                <td>{client.membershipTier ? tiers[client.membershipTier].name : "Pending"}</td>
                <td>{client.billingDate || "Not set"}</td>
                <td><span className={`rounded-full px-3 py-1 text-xs font-black ${client.status === "active" ? "bg-green-100 text-green-700" : client.status === "past_due" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{client.status.replace("_", " ")}</span></td>
                <td className="text-xs text-slate-500">{client.stripeCustomerId || "No card"}</td>
                <td className="text-right"><button onClick={()=>chargeMember(client)} className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white"><CreditCard className="mr-1 inline" size={14}/> Charge member</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
        <h2 className="text-2xl font-black">Billing history</h2>
        <div className="mt-4 space-y-3">
          {events.map(e => <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-slate-50 p-4"><div><p className="font-black">{e.memberName} · ${e.amount}</p><p className="text-xs text-slate-500">{e.id} · {e.source} · {new Date(e.createdAt).toLocaleString()}</p></div><div className="text-right"><span className={`rounded-full px-3 py-1 text-xs font-black ${e.status === "succeeded" ? "bg-green-100 text-green-700" : e.status === "failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{e.status}</span><p className="mt-1 text-xs text-slate-500">{e.note}</p></div></div>)}
        </div>
      </div>
    </div>
  </AdminShell>
}
