export type MembershipTier = "annual" | "six_month" | "three_month";

export type AthleteClient = {
  user_id: string;
  firstName: string;
  lastName: string;
  athleteDob: string;
  parentEmail: string;
  phone: string;
  emergencyContact: string;
  programInterest: string;
  membershipTier?: MembershipTier;
  stripeCustomerId?: string;
  billingDate?: string;
  status: "profile_created" | "payment_pending" | "active" | "past_due";
  createdAt: string;
};

export type BillingEvent = {
  id: string;
  user_id: string;
  memberName: string;
  tier: MembershipTier;
  amount: number;
  status: "succeeded" | "failed" | "pending";
  createdAt: string;
  source: "manual" | "bulk" | "scheduled";
  note: string;
};
