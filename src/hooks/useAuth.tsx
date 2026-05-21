import { useState, useEffect, createContext, useContext } from "react";
import { User, getCurrentUser, loginUser, logoutUser } from "@/lib/mock-api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  loading: boolean;
  login: (mobile: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial auth state
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (mobile: string, password?: string) => {
    try {
      setLoading(true);
      const res = await loginUser(mobile, password);
      setUser(res.user);
      toast.success("Logged in successfully");
      
      // Redirect based on role
      if (res.user.role === "admin") navigate("/dashboard/admin");
      else if (res.user.role === "crm") navigate("/dashboard/crm");
      else if (res.user.role === "partner") navigate("/dashboard/partner");
      else navigate("/dashboard");

    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    setLoading(false);
    navigate("/login");
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
