"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { StepNav } from "@/components/StepNav";

export default function LoadingPage() {
  const router = useRouter();
  useEffect(() => { const t = setTimeout(() => router.push("/signup/payment"), 2200); return () => clearTimeout(t); }, [router]);
  return <main className="flex min-h-screen items-center justify-center bg-grid bg-ink px-6">
    <div className="text-center">
      <div className="mx-auto mb-8 flex justify-center"><Brand /></div>
      <div className="mx-auto mb-8 w-fit"><StepNav active={1}/></div>
      <div className="mx-auto flex h-28 w-28 animate-pulse items-center justify-center rounded-[2rem] bg-lime text-5xl font-black text-ink shadow-glow">PR</div>
      <h1 className="mt-8 text-4xl font-black">Setting up your profile...</h1>
      <p className="mt-3 text-slate-300">Connecting your new Healthie user ID to the membership step.</p>
    </div>
  </main>
}
