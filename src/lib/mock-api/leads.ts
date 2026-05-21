import { getDB, saveDB } from "./db";
import { Lead, CRMResponse, City, LeadStatus } from "./types";
import { getCurrentUser } from "./auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () => Math.random().toString(36).substr(2, 9);

export const submitLead = async (leadData: Omit<Lead, "id" | "status" | "createdAt" | "updatedAt">) => {
  await delay(800);
  const { leads, users } = getDB();
  const currentUser = getCurrentUser();

  // Check if lead with mobile already exists to avoid duplicates
  const existingLead = leads.find((l) => l.mobile === leadData.mobile);

  const newLead: Lead = {
    ...leadData,
    id: `lead-${generateId()}`,
    status: existingLead ? existingLead.status : (leadData.source === "Partner Lead" ? "In Process" : "New"),
    partnerId: currentUser?.role === "partner" ? currentUser.id : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // If customer doesn't exist in users table, create a customer user implicitly
  const existingUser = users.find((u) => u.mobile === leadData.mobile);
  if (!existingUser) {
    users.push({
      id: `cust-${generateId()}`,
      name: leadData.customerName,
      mobile: leadData.mobile,
      role: "customer",
      status: "Active",
      createdAt: new Date().toISOString(),
    });
    saveDB("users", users);
  }

  // Update or insert lead
  if (existingLead) {
    // Merge updates
    const updatedLeads = leads.map((l) => 
      l.mobile === leadData.mobile ? { ...l, ...leadData, updatedAt: new Date().toISOString() } : l
    );
    saveDB("leads", updatedLeads);
    return updatedLeads.find((l) => l.mobile === leadData.mobile);
  } else {
    leads.push(newLead);
    saveDB("leads", leads);
    return newLead;
  }
};

export const getLeads = async (filters?: { city?: City; status?: LeadStatus; mobile?: string }) => {
  await delay(600);
  const { leads } = getDB();
  const currentUser = getCurrentUser();
  
  if (!currentUser) throw new Error("Unauthorized");

  let filteredLeads = leads;

  // Role-based filtering
  if (currentUser.role === "crm") {
    filteredLeads = filteredLeads.filter((l) => l.city === currentUser.city);
  } else if (currentUser.role === "partner") {
    filteredLeads = filteredLeads.filter((l) => l.partnerId === currentUser.id);
  } else if (currentUser.role === "customer") {
    filteredLeads = filteredLeads.filter((l) => l.mobile === currentUser.mobile);
  }

  // Additional explicit filters
  if (filters?.city) {
    filteredLeads = filteredLeads.filter((l) => l.city === filters.city);
  }
  if (filters?.status) {
    filteredLeads = filteredLeads.filter((l) => l.status === filters.status);
  }
  if (filters?.mobile) {
    filteredLeads = filteredLeads.filter((l) => l.mobile.includes(filters.mobile!));
  }

  // Sort by latest
  return filteredLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getLeadByMobile = async (mobile: string) => {
  await delay(500);
  const { leads } = getDB();
  return leads.find(l => l.mobile === mobile) || null;
};

export const addCRMResponse = async (
  leadId: string, 
  responseType: LeadStatus, 
  notes: string, 
  followUpDate?: string, 
  siteVisitDate?: string
) => {
  await delay(800);
  const { leads, responses } = getDB();
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.role !== "crm") {
    throw new Error("Unauthorized: Only CRM can add responses");
  }

  const leadIndex = leads.findIndex(l => l.id === leadId);
  if (leadIndex === -1) throw new Error("Lead not found");

  const lead = leads[leadIndex];

  // Verify location match
  if (lead.city !== currentUser.city) {
    throw new Error("Unauthorized: Cannot modify leads from other locations");
  }

  const newResponse: CRMResponse = {
    id: `resp-${generateId()}`,
    leadId,
    crmId: currentUser.id,
    responseType,
    notes,
    followUpDate,
    siteVisitDate,
    createdAt: new Date().toISOString(),
  };

  responses.push(newResponse);
  saveDB("responses", responses);

  // Update Lead Status
  leads[leadIndex] = {
    ...lead,
    status: responseType,
    crmId: currentUser.id,
    updatedAt: new Date().toISOString(),
  };
  saveDB("leads", leads);

  return newResponse;
};

export const getCRMResponsesForLead = async (leadId: string) => {
  await delay(400);
  const { responses } = getDB();
  return responses.filter(r => r.leadId === leadId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
