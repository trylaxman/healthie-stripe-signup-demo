import { AthleteClient, BillingEvent } from "./types";

const CLIENTS = "hp_clients";
const EVENTS = "hp_billing_events";
const CURRENT = "hp_current_client";

const isBrowser = () => typeof window !== "undefined";

export function getClients(): AthleteClient[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(CLIENTS);
  if (!raw) {
    const seed: AthleteClient[] = [
      { user_id: "USR-10421", firstName: "Maya", lastName: "Collins", athleteDob: "2011-08-14", parentEmail: "parent.maya@example.com", phone: "(555) 102-7741", emergencyContact: "Ava Collins", programInterest: "Recovery + Mobility", membershipTier: "annual", stripeCustomerId: "cus_mock_maya", billingDate: "2026-07-01", status: "active", createdAt: new Date().toISOString() },
      { user_id: "USR-10422", firstName: "Noah", lastName: "Rivera", athleteDob: "2010-03-02", parentEmail: "rivera.family@example.com", phone: "(555) 226-9011", emergencyContact: "Elena Rivera", programInterest: "Speed + Recovery", membershipTier: "six_month", stripeCustomerId: "cus_mock_noah", billingDate: "2026-07-01", status: "active", createdAt: new Date().toISOString() },
      { user_id: "USR-10423", firstName: "Eli", lastName: "Watson", athleteDob: "2012-10-19", parentEmail: "watson@example.com", phone: "(555) 888-4560", emergencyContact: "Sam Watson", programInterest: "Strength Foundation", membershipTier: "three_month", stripeCustomerId: "cus_mock_eli", billingDate: "2026-07-01", status: "past_due", createdAt: new Date().toISOString() }
    ];
    localStorage.setItem(CLIENTS, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

export function saveClients(clients: AthleteClient[]) {
  if (isBrowser()) localStorage.setItem(CLIENTS, JSON.stringify(clients));
}

export function upsertClient(client: AthleteClient) {
  const clients = getClients();
  const index = clients.findIndex((c) => c.user_id === client.user_id);
  if (index >= 0) clients[index] = client; else clients.unshift(client);
  saveClients(clients);
}

export function setCurrentClient(client: AthleteClient) {
  if (isBrowser()) localStorage.setItem(CURRENT, JSON.stringify(client));
  upsertClient(client);
}

export function getCurrentClient(): AthleteClient | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(CURRENT);
  return raw ? JSON.parse(raw) : null;
}

export function updateClient(user_id: string, patch: Partial<AthleteClient>) {
  const clients = getClients();
  const updated = clients.map((c) => c.user_id === user_id ? { ...c, ...patch } : c);
  saveClients(updated);
  const current = getCurrentClient();
  if (current?.user_id === user_id) localStorage.setItem(CURRENT, JSON.stringify({ ...current, ...patch }));
}

export function getBillingEvents(): BillingEvent[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(EVENTS);
  if (!raw) {
    const seed: BillingEvent[] = [{ id: "BILL-9001", user_id: "USR-10421", memberName: "Maya Collins", tier: "annual", amount: 159, status: "succeeded", createdAt: new Date().toISOString(), source: "scheduled", note: "Mock Healthie createBillingItem processed" }];
    localStorage.setItem(EVENTS, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

export function addBillingEvent(event: BillingEvent) {
  if (!isBrowser()) return;
  const events = getBillingEvents();
  localStorage.setItem(EVENTS, JSON.stringify([event, ...events]));
}
