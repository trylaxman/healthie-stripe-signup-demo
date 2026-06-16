import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthie + Stripe Signup Demo",
  description: "Custom React signup flow with Healthie API simulation, Stripe membership billing, and admin console."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
