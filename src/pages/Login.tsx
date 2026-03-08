import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import placementImg from "@/assets/placement-training.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const floatingVariants = {
  animate: (i: number) => ({
    y: [0, -15, 0],
    rotate: [0, i % 2 === 0 ? 8 : -8, 0],
    transition: {
      duration: 4 + i,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "var(--login-gradient)" }}>
      {/* Animated background particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-foreground/5"
          style={{
            width: 80 + i * 60,
            height: 80 + i * 60,
            top: `${10 + i * 18}%`,
            left: `${5 + i * 15}%`,
          }}
          custom={i}
          variants={floatingVariants}
          animate="animate"
        />
      ))}

      {/* Left content area */}
      <motion.div
        className="hidden lg:flex lg:w-[45%] relative items-center justify-center"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={placementImg}
              alt="Placement Training"
              className="w-72 h-72 mx-auto mb-8 rounded-[2rem] object-cover"
              style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.3)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-primary-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Placement Training
          </motion.h2>
          <motion.p
            className="text-primary-foreground/70 text-lg leading-relaxed max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Master your skills and ace your placements with our comprehensive training platform.
          </motion.p>
        </div>
      </motion.div>

      {/* White form panel with curvy left edge */}
      <motion.div
        className="flex-1 flex items-center justify-center relative"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Curvy SVG edge */}
        <div className="absolute left-0 top-0 bottom-0 w-24 -translate-x-[1px] hidden lg:block">
          <svg
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            className="h-full w-full"
            fill="hsl(var(--card))"
          >
            <path d="M100,0 L100,800 L0,800 C30,650 60,550 30,400 C0,250 50,150 20,0 Z" />
          </svg>
        </div>

        <div className="relative z-10 bg-card w-full h-full flex items-center justify-center p-6 sm:p-12 lg:rounded-l-none">
          <motion.div
            className="w-full max-w-[420px]"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Mobile branding */}
            <motion.div variants={staggerItem} className="lg:hidden text-center mb-8">
              <motion.img
                src={placementImg}
                alt="Placement Training"
                className="w-16 h-16 mx-auto mb-3 rounded-2xl object-cover"
                style={{ boxShadow: "var(--login-glow)" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <h2 className="text-lg font-bold text-foreground">Placement Training</h2>
            </motion.div>

            {/* Header */}
            <motion.div variants={staggerItem} className="mb-8">
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
            <motion.div variants={staggerItem} className="flex bg-muted rounded-2xl p-1.5 mb-8">
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

            <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <motion.div
                      className="relative"
                      animate={focusedField === "name" ? { scale: 1.01 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-300 ${focusedField === "name" ? "text-primary" : "text-muted-foreground"}`} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.1)] transition-all duration-300 text-sm"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <motion.div
                  className="relative"
                  animate={focusedField === "email" ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-300 ${focusedField === "email" ? "text-primary" : "text-muted-foreground"}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.1)] transition-all duration-300 text-sm"
                    required
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <motion.div
                  className="relative"
                  animate={focusedField === "password" ? { scale: 1.01 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-300 ${focusedField === "password" ? "text-primary" : "text-muted-foreground"}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border-2 border-input bg-background text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.1)] transition-all duration-300 text-sm"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    whileTap={{ scale: 0.85 }}
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </motion.button>
                </motion.div>
              </div>

              {!isSignUp && (
                <motion.div className="flex justify-end" whileHover={{ x: 2 }}>
                  <button type="button" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </button>
                </motion.div>
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
                  <motion.span
                    className="flex items-center gap-2"
                    initial={false}
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
