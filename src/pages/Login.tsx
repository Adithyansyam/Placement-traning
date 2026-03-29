import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { getApiUrl } from "@/lib/api";

const REDIRECT_MAP: Record<UserRole, string> = { student: "/home", admin: "/admin", placement: "/placement" };

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Store token and login user
      localStorage.setItem("pp_token", data.token);
      localStorage.setItem("pp_userId", data.user.id);
      login("student", { name: data.user.name, email: data.user.email });
      
      toast.success("Welcome back! ✓");
      navigate(REDIRECT_MAP["student"]);
    } catch (err) {
      toast.error("Network error. Please check if the server is running.");
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-center items-center px-16 relative overflow-hidden gradient-bg">
        {/* Decorative elements */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 -top-32 -left-32" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5 bottom-20 -right-20" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.04] top-1/2 left-10" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03] blur-2xl" />

        <motion.div className="relative z-10 max-w-md" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">PlacePrep</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Welcome Back to<br />PlacePrep
          </h1>
          <p className="mt-4 text-white/60 text-base leading-relaxed">
            Your one-stop platform for placement preparation. Practice, learn, and crack your dream company.
          </p>
          <div className="mt-10 flex items-center gap-6">
            {[
              { value: "10K+", label: "Students" },
              { value: "500+", label: "Questions" },
              { value: "95%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-background mesh-bg px-6 py-12">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold gradient-text">PlacePrep</span>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-border/30">
            <h2 className="text-2xl font-extrabold text-foreground mb-1">Sign In</h2>
            <p className="text-sm text-muted-foreground mb-6">Enter your credentials to continue</p>



            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all backdrop-blur-sm ${
                      errors.email ? "border-destructive" : "border-border/50"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all backdrop-blur-sm ${
                      errors.password ? "border-destructive" : "border-border/50"
                    }`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1 font-medium">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 font-semibold text-sm gradient-bg border-0 shadow-lg shadow-primary/20 gap-2 rounded-xl hover:opacity-90"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground font-medium">OR</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button type="button" onClick={() => navigate("/register")} className="text-primary font-semibold hover:underline">Register</button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
