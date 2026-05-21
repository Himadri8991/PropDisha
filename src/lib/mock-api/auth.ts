import { getDB, saveDB } from "./db";
import { User, Role } from "./types";

// Simulating JWT and Server Delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = async (mobile: string, password?: string): Promise<{ token: string; user: Omit<User, "password"> }> => {
  await delay(800);
  const { users } = getDB();
  
  // Find user by mobile
  const user = users.find((u) => u.mobile === mobile);
  
  if (!user) {
    throw new Error("User not found with this mobile number");
  }

  // If customer direct login (OTP based, we simulate it here just checking mobile for now)
  if (user.role === "customer") {
     // customers don't need password for this demo, just phone verification
  } else {
    // Other roles require password
    if (user.password !== password) {
      throw new Error("Invalid password");
    }
  }

  if (user.status !== "Active") {
    throw new Error("Account is inactive. Please contact administrator.");
  }

  // Create mock token (In real app, this is signed JWT)
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  localStorage.setItem("propdisha_token", token);
  localStorage.setItem("propdisha_current_user", JSON.stringify(user));

  const { password: _, ...userWithoutPassword } = user;
  
  return { token, user: userWithoutPassword };
};

export const logoutUser = async () => {
  await delay(400);
  localStorage.removeItem("propdisha_token");
  localStorage.removeItem("propdisha_current_user");
};

export const getCurrentUser = (): Omit<User, "password"> | null => {
  const token = localStorage.getItem("propdisha_token");
  const userStr = localStorage.getItem("propdisha_current_user");
  
  if (token && userStr) {
    return JSON.parse(userStr);
  }
  return null;
};
