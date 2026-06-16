const steps = ["Intake", "Profile Setup", "Membership", "Done"];
export function StepNav({ active }: { active: number }) {
  return <div className="flex gap-2">
    {steps.map((s, i) => <div key={s} className={`rounded-full px-3 py-1 text-xs font-bold ${i <= active ? "bg-lime text-ink" : "bg-white/10 text-slate-300"}`}>{s}</div>)}
  </div>;
}
