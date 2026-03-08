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
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "var(--login-gradient)" }}
    >
      {/* Floating background circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary-foreground/8"
          style={{
            width: 150 + i * 120,
            height: 150 + i * 120,
            top: `${[10, 60, 20, 70][i]}%`,
            left: `${[5, 70, 50, 15][i]}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, i % 2 === 0 ? 40 : -40, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main white card */}
      <motion.div
        className="relative z-10 w-full max-w-[900px] bg-card rounded-[2rem] overflow-hidden flex flex-col lg:flex-row"
        style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.3)" }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left side - Image area inside the card */}
        <motion.div
          className="hidden lg:flex lg:w-[42%] items-center justify-center p-8 relative"
          style={{ background: "var(--login-gradient)" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Inner floating shapes */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-primary-foreground/10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "8%", left: "5%" }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-primary-foreground/5"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: "15%", right: "10%" }}
          />

          <div className="relative z-10 text-center">
            <motion.img
              src={placementImg}
              alt="Placement Training"
              className="w-52 h-52 mx-auto mb-6 rounded-2xl object-cover bg-card/10 backdrop-blur-sm"
              style={{ boxShadow: "0 16px 40px -8px rgba(0,0,0,0.25)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.p
              className="text-primary-foreground/80 text-sm leading-relaxed max-w-[200px] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Master your skills and ace your placements
            </motion.p>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Mobile image */}
          <motion.div
            className="lg:hidden flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={placementImg}
              alt="Placement Training"
              className="w-16 h-16 rounded-xl object-cover"
              style={{ boxShadow: "var(--login-glow)" }}
            />
          </motion.div>

          {/* Header */}
          <motion.div
            className="mb-7"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {isSignUp
                ? "Enter your details to get started"
                : "Enter your credentials to sign in"}
            </p>
          </motion.div>

          {/* Toggle tabs */}
          <motion.div
            className="flex bg-muted rounded-2xl p-1.5 mb-7"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {["Sign In", "Sign Up"].map((label, i) => (
              <button
                key={label}
                onClick={() => setIsSignUp(i === 1)}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                  (i === 0 && !isSignUp) || (i === 1 && isSignUp)
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {((i === 0 && !isSignUp) || (i === 1 && isSignUp)) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "var(--login-gradient)", boxShadow: "var(--login-glow)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <label className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                  <motion.div
                    className="relative"
                    animate={focusedField === "name" ? { scale: 1.01 } : { scale: 1 }}
                  >
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === "name" ? "text-primary" : "text-muted-foreground"}`} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-muted bg-muted/50 text-foreground focus:outline-none focus:border-primary focus:bg-card focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.08)] transition-all duration-300 text-sm"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Email</label>
              <motion.div
                className="relative"
                animate={focusedField === "email" ? { scale: 1.01 } : { scale: 1 }}
              >
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === "email" ? "text-primary" : "text-muted-foreground"}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-muted bg-muted/50 text-foreground focus:outline-none focus:border-primary focus:bg-card focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.08)] transition-all duration-300 text-sm"
                  required
                />
              </motion.div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Password</label>
              <motion.div
                className="relative"
                animate={focusedField === "password" ? { scale: 1.01 } : { scale: 1 }}
              >
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === "password" ? "text-primary" : "text-muted-foreground"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-14 py-4 rounded-2xl border-2 border-muted bg-muted/50 text-foreground focus:outline-none focus:border-primary focus:bg-card focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.08)] transition-all duration-300 text-sm"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  whileTap={{ scale: 0.85 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </motion.div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary hover:underline font-semibold">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
              style={{ background: "var(--login-gradient)", boxShadow: "var(--login-glow)" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 16px 48px -4px hsl(217 91% 60% / 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
