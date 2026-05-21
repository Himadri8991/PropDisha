import { User, Lead, CRMResponse, City } from "./types";

export const getDB = () => {
  const usersStr = localStorage.getItem("propdisha_users");
  const leadsStr = localStorage.getItem("propdisha_leads");
  const responsesStr = localStorage.getItem("propdisha_responses");

  let users: User[] = usersStr ? JSON.parse(usersStr) : [];
  let leads: Lead[] = leadsStr ? JSON.parse(leadsStr) : [];
  let responses: CRMResponse[] = responsesStr ? JSON.parse(responsesStr) : [];

  if (users.length === 0) {
    users = [
      {
        id: "admin-1",
        name: "Super Admin",
        mobile: "9999999999",
        password: "password123", // mock hash would be used in real app
        role: "admin",
        status: "Active",
      },
      {
        id: "crm-1",
        name: "Kolkata CRM",
        mobile: "8888888888",
        password: "password123",
        role: "crm",
        city: "Kolkata",
        status: "Active",
      },
      {
        id: "partner-1",
        name: "Demo Partner",
        mobile: "7777777777",
        password: "password123",
        role: "partner",
        status: "Active",
      },
    ];
    saveDB("users", users);
  }

  return { users, leads, responses };
};

export const saveDB = (type: "users" | "leads" | "responses", data: any) => {
  localStorage.setItem(`propdisha_${type}`, JSON.stringify(data));
};

export const clearDB = () => {
  localStorage.removeItem("propdisha_users");
  localStorage.removeItem("propdisha_leads");
  localStorage.removeItem("propdisha_responses");
};
