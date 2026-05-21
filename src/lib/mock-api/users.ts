import { getDB, saveDB } from "./db";
import { User, Role } from "./types";
import { getCurrentUser } from "./auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const generateId = () => Math.random().toString(36).substr(2, 9);

export const getAllUsers = async () => {
  await delay(600);
  const currentUser = getCurrentUser();
  if (currentUser?.role !== "admin") throw new Error("Unauthorized");
  
  const { users } = getDB();
  return users.map(({ password, ...u }) => u);
};

export const createUser = async (userData: Omit<User, "id" | "createdAt">) => {
  await delay(800);
  const currentUser = getCurrentUser();
  if (currentUser?.role !== "admin") throw new Error("Unauthorized");

  const { users } = getDB();
  
  if (users.find(u => u.mobile === userData.mobile)) {
    throw new Error("User with this mobile number already exists");
  }

  const newUser: User = {
    ...userData,
    id: `${userData.role}-${generateId()}`,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveDB("users", users);

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const updateUserStatus = async (userId: string, status: "Active" | "Inactive") => {
  await delay(500);
  const currentUser = getCurrentUser();
  if (currentUser?.role !== "admin") throw new Error("Unauthorized");

  const { users } = getDB();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) throw new Error("User not found");

  users[userIndex].status = status;
  saveDB("users", users);

  return users[userIndex];
};

export const getDashboardStats = async () => {
  await delay(700);
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("Unauthorized");

  const { leads, responses } = getDB();

  if (currentUser.role === "admin") {
    return {
      totalLeads: leads.length,
      siteVisits: leads.filter(l => l.status === "Site Visit").length,
      partnerLeads: leads.filter(l => l.source === "Partner Lead").length,
      directLeads: leads.filter(l => l.source === "Direct Website Lead").length,
      cityWise: leads.reduce((acc, curr) => {
        acc[curr.city] = (acc[curr.city] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  if (currentUser.role === "crm") {
    const myLeads = leads.filter(l => l.city === currentUser.city);
    return {
      totalAssigned: myLeads.length,
      inProcess: myLeads.filter(l => l.status === "In Process" || l.status === "New").length,
      siteVisits: myLeads.filter(l => l.status === "Site Visit").length,
      closed: myLeads.filter(l => l.status === "Closed" || l.status === "Not Interested" || l.status === "Submitted By Mistake").length,
    };
  }

  if (currentUser.role === "partner") {
    const myLeads = leads.filter(l => l.partnerId === currentUser.id);
    return {
      totalSubmitted: myLeads.length,
      inProcess: myLeads.filter(l => l.status === "In Process" || l.status === "New").length,
      siteVisits: myLeads.filter(l => l.status === "Site Visit").length,
    };
  }

  return {};
};
