import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !password) return;
    try {
      await login(mobile, password);
    } catch (error) {
      // Error handled in hook via toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-deep p-4 relative">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 text-foreground/40 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      <Card className="w-full max-w-md glass-strong border-white/5 text-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-display">Sign In</CardTitle>
          <CardDescription className="text-foreground/40 font-light">
            Enter your mobile number and password to access your portal.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] tracking-widest uppercase text-foreground/40" htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-gold/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] tracking-widest uppercase text-foreground/40" htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-gold/50"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full btn-gold"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Access Portal"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
