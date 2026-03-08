import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import placementImg from "@/assets/placement-training.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Left decorative panel */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center"
        style={{ background: "var(--login-gradient)" }}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Floating shapes */}
        <motion.div
          className="absolute w-72 h-72 rounded-full border border-primary-foreground/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "15%", left: "10%" }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-3xl border border-primary-foreground/10 rotate-45"
          animate={{ scale: [1.1, 1, 1.1], rotate: [45, 135, 45] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "20%", right: "15%" }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-primary-foreground/5"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "40%", right: "30%" }}
        />

        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm mx-auto mb-8 flex items-center justify-center border border-primary-foreground/20">
              <span className="text-primary-foreground font-bold text-3xl">PT</span>
            </div>
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Placement Training
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-sm mx-auto">
              Master your skills and ace your placements with our comprehensive training platform.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Subtle background blob for mobile */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl lg:hidden"
          style={{ background: "var(--login-gradient)", top: "-15%", right: "-15%" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="w-full max-w-[420px] relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <motion.div
              className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "var(--login-gradient)", boxShadow: "var(--login-glow)" }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary-foreground font-bold text-lg">PT</span>
            </motion.div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              {isSignUp
                ? "Enter your details to get started"
                : "Enter your credentials to sign in"}
            </p>
          </div>

          {/* Toggle tabs */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            {["Sign In", "Sign Up"].map((label, i) => (
              <button
                key={label}
                onClick={() => setIsSignUp(i === 1)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 relative ${
                  (i === 0 && !isSignUp) || (i === 1 && isSignUp)
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {((i === 0 && !isSignUp) || (i === 1 && isSignUp)) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--login-gradient)", boxShadow: "var(--login-glow)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all mt-2"
              style={{ background: "var(--login-gradient)", boxShadow: "var(--login-glow)" }}
              whileHover={{ scale: 1.01, boxShadow: "0 12px 40px -4px hsl(217 91% 60% / 0.45)" }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
