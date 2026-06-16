import { MembershipTier } from "./types";

export const tiers: Record<MembershipTier, { name: string; amount: number; label: string; description: string }> = {
  annual: { name: "Annual", amount: 159, label: "$159/mo", description: "Best value for year-round performance and recovery." },
  six_month: { name: "6-Month", amount: 200, label: "$200/mo", description: "Structured support across a full training cycle." },
  three_month: { name: "3-Month", amount: 300, label: "$300/mo", description: "Flexible short-term membership for new athletes." }
};
