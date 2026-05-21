export type Role = "admin" | "crm" | "partner" | "customer";
export type Status = "Active" | "Inactive";
export type City = "Kolkata" | "Mumbai" | "Delhi" | "Bangalore" | "Pune" | "Chennai" | "Hyderabad" | "Other";
export type LeadStatus = "New" | "In Process" | "Site Visit" | "Call Later" | "Not Interested" | "Submitted By Mistake" | "Closed";

export interface User {
  id: string;
  name: string;
  mobile: string; // Unique UID
  password?: string;
  role: Role;
  city?: City; // Required for CRM
  status: Status;
  createdAt?: string;
}

export interface Lead {
  id: string;
  customerName: string;
  mobile: string;
  email?: string;
  requirement: "2 BHK" | "3 BHK" | "4 BHK" | "5 BHK" | string;
  budget: string;
  project?: string;
  buyingTimeline: "Immediate" | "1 Month" | "3 Months" | "6 Months";
  source: "Partner Lead" | "Direct Website Lead";
  partnerId?: string; // If submitted by partner
  crmId?: string; // If assigned to CRM
  city: City;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CRMResponse {
  id: string;
  leadId: string;
  crmId: string;
  responseType: LeadStatus;
  notes: string;
  followUpDate?: string;
  siteVisitDate?: string;
  createdAt: string;
}
