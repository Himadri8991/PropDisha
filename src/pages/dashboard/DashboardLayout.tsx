import { Outlet, Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Home, Settings, FileText, Users, LayoutDashboard } from "lucide-react";

const DashboardLayout = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="min-h-screen bg-navy-deep text-foreground flex items-center justify-center font-display">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-navy-deep text-foreground flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-strong border-r border-white/5 flex flex-col z-10">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2.5 mb-6 group">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep grid place-items-center shadow-[0_0_15px_-5px_hsl(var(--gold))]">
              <span className="font-display text-navy-deep font-bold text-sm">P</span>
            </div>
            <span className="font-display text-xl tracking-tighter">
              Prop<span className="text-gradient-gold">Disha</span>
            </span>
          </Link>
          <p className="text-[10px] tracking-widest uppercase text-gold font-bold">
            {user?.role} Portal
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-foreground/50 hover:text-gold hover:bg-white/5 tracking-wider text-sm" onClick={() => navigate(`/dashboard/${user?.role}`)}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          {user?.role === "admin" && (
            <Button variant="ghost" className="w-full justify-start text-foreground/50 hover:text-gold hover:bg-white/5 tracking-wider text-sm" onClick={() => navigate(`/dashboard/admin/users`)}>
              <Users className="mr-2 h-4 w-4" /> User Management
            </Button>
          )}
          <Button variant="ghost" className="w-full justify-start text-foreground/50 hover:text-gold hover:bg-white/5 tracking-wider text-sm" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" /> Public Site
          </Button>
        </nav>
        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="border border-gold/20">
              <AvatarFallback className="bg-navy-elevated text-gold font-display">{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-foreground">{user?.name}</p>
              <p className="text-[10px] text-foreground/40 uppercase tracking-wider">{user?.role} {user?.city ? `· ${user.city}` : ""}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Secure Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto relative">
        <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
