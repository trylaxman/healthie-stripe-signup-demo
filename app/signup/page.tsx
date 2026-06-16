"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { StepNav } from "@/components/StepNav";
import { setCurrentClient } from "@/lib/storage";
import { AthleteClient } from "@/lib/types";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", athleteDob: "", parentEmail: "", phone: "", emergencyContact: "", programInterest: "Recovery + Mobility" });

  function update(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/healthie/create-client", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, dont_send_welcome: true }) });
    const data = await res.json();
    const client: AthleteClient = { ...form, user_id: data.user_id, status: "profile_created", createdAt: new Date().toISOString() };
    setCurrentClient(client);
    router.push("/signup/loading");
  }

  return <main className="min-h-screen bg-grid bg-ink px-6 py-8">
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-center justify-between gap-4"><Brand /><StepNav active={0}/></header>
      <div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="card rounded-[2rem] p-7">
          <p className="text-sm font-bold uppercase text-lime">Step 1</p>
          <h1 className="mt-3 text-4xl font-black">Athlete intake form</h1>
          <p className="mt-4 leading-7 text-slate-300">This replaces the Healthie embedded iframe with a custom React flow. Submission simulates Healthie's <b>createClient</b> mutation with <b>dont_send_welcome: true</b>.</p>
          <div className="mt-6 rounded-2xl border border-lime/20 bg-lime/10 p-4 text-sm text-lime">On success, a Healthie user_id is returned immediately and passed to payment.</div>
        </div>
        <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className="mb-2 block text-sm font-bold">First Name</label><input required className="input" value={form.firstName} onChange={(e)=>update("firstName",e.target.value)} placeholder="Jordan"/></div>
            <div><label className="mb-2 block text-sm font-bold">Last Name</label><input required className="input" value={form.lastName} onChange={(e)=>update("lastName",e.target.value)} placeholder="Taylor"/></div>
            <div><label className="mb-2 block text-sm font-bold">Athlete DOB</label><input required type="date" className="input" value={form.athleteDob} onChange={(e)=>update("athleteDob",e.target.value)}/></div>
            <div><label className="mb-2 block text-sm font-bold">Parent Email</label><input required type="email" className="input" value={form.parentEmail} onChange={(e)=>update("parentEmail",e.target.value)} placeholder="parent@example.com"/></div>
            <div><label className="mb-2 block text-sm font-bold">Phone</label><input required className="input" value={form.phone} onChange={(e)=>update("phone",e.target.value)} placeholder="(555) 123-4567"/></div>
            <div><label className="mb-2 block text-sm font-bold">Emergency Contact</label><input required className="input" value={form.emergencyContact} onChange={(e)=>update("emergencyContact",e.target.value)} placeholder="Parent / Guardian"/></div>
            <div className="md:col-span-2"><label className="mb-2 block text-sm font-bold">Program Interest</label><select className="input" value={form.programInterest} onChange={(e)=>update("programInterest",e.target.value)}><option>Recovery + Mobility</option><option>Speed + Recovery</option><option>Strength Foundation</option><option>Performance Membership</option></select></div>
          </div>
          <button disabled={loading} className="btn btn-primary mt-6 w-full">{loading ? "Creating Healthie profile..." : "Create profile and continue"}</button>
        </form>
      </div>
    </div>
  </main>;
}
