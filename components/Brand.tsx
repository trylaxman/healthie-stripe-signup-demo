import { Activity } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-ink shadow-glow"><Activity size={24}/></div>
    {!compact && <div><div className="text-lg font-black tracking-tight">Peak Recovery</div><div className="text-xs text-slate-400">Healthie + Stripe demo</div></div>}
  </div>;
}
