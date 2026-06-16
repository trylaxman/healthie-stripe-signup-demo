"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "@/components/Brand";
import { StepNav } from "@/components/StepNav";
import { getCurrentClient } from "@/lib/storage";
import { tiers } from "@/lib/pricing";
import { AthleteClient } from "@/lib/types";

export default function SuccessPage() {
  const [client, setClient] = useState<AthleteClient | null>(null);
  useEffect(() => { setClient(getCurrentClient()); }, []);
  return <main className="flex min-h-screen items-center justify-center bg-grid bg-ink px-6 py-10">
    <div className="w-full max-w-3xl rounded-[2rem] bg-white p-8 text-center text-slate-950 shadow-2xl">
      <div className="mb-6 flex justify-center"><Brand /></div>
      <div className="mb-8 flex justify-center"><StepNav active={3}/></div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime text-4xl font-black">✓</div>
      <h1 className="mt-6 text-4xl font-black">Membership activated</h1>
      <p className="mt-3 text-slate-600">The athlete profile was created, payment method was stored, and the selected tier was tagged in Healthie.</p>
      <div className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-5 text-left md:grid-cols-3">
        <div><p className="text-xs font-bold uppercase text-slate-500">Athlete</p><p className="font-black">{client?.firstName} {client?.lastName}</p></div>
        <div><p className="text-xs font-bold uppercase text-slate-500">Healthie ID</p><p className="font-black">{client?.user_id}</p></div>
        <div><p className="text-xs font-bold uppercase text-slate-500">Tier</p><p className="font-black">{client?.membershipTier ? tiers[client.membershipTier].name : "Annual"}</p></div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/signup" className="btn btn-secondary !text-slate-950">Run flow again</Link><Link href="/admin" className="btn btn-primary">Open admin console</Link></div>
    </div>
  </main>
}
