import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import placementImg from "@/assets/placement-training.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const InputField = ({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  required,
  children,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  children?: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-semibold text-primary mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground peer-focus:text-primary transition-colors duration-300" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full pl-12 pr-14 py-4 rounded-2xl border-2 border-muted bg-muted/50 text-foreground focus:outline-none focus:border-primary focus:bg-card focus:shadow-[0_0_0_4px_hsl(217_91%_60%/0.08)] transition-all duration-300 text-sm"
        required={required}
      />
      {children}
    </div>
  </div>
);

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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "var(--login-gradient)" }}
    >
      {/* Background circles */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-primary-foreground/8 animate-pulse"
          style={{
            width: 150 + i * 120,
            height: 150 + i * 120,
            top: `${[10, 60, 20, 70][i]}%`,
            left: `${[5, 70, 50, 15][i]}%`,
            transform: "translate(-50%, -50%)",
            animationDuration: `${6 + i * 2}s`,
          }}
        />
      ))}

      {/* Main white card */}
      <div
        className="relative z-10 w-full max-w-[900px] bg-card rounded-[2rem] overflow-hidden flex flex-col lg:flex-row"
        style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.3)" }}
      >
        {/* Left - Image area */}
        <div
          className="hidden lg:flex lg:w-[42%] items-center justify-center p-8 relative"
          style={{ background: "var(--login-gradient)" }}
        >
          <div className="absolute w-40 h-40 rounded-full border border-primary-foreground/10 top-[8%] left-[5%]" />
          <div className="absolute w-24 h-24 rounded-full bg-primary-foreground/5 bottom-[15%] right-[10%]" />

          <div className="relative z-10 text-center">
            <img
              src={placementImg}
              alt="Placement Training"
              className="w-52 h-52 mx-auto mb-6 rounded-2xl object-cover"
              style={{ boxShadow: "0 16px 40px -8px rgba(0,0,0,0.25)" }}
            />
            <h3 className="text-primary-foreground font-bold text-lg mb-1">
              Placement Training
            </h3>
            <p className="text-primary-foreground/75 text-sm leading-relaxed max-w-[220px] mx-auto">
              Sharpen your skills, crack interviews, and land your dream job with expert-led training.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Mobile image */}
          <div className="lg:hidden flex justify-center mb-6">
            <img
              src={placementImg}
              alt="Placement Training"
              className="w-16 h-16 rounded-xl object-cover"
              style={{ boxShadow: "var(--login-glow)" }}
            />
          </div>

          {/* Header */}
          <div className="mb-7">
            <h1 className="text-3xl font-bold text-foreground">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {isSignUp ? "Enter your details to get started" : "Enter your credentials to sign in"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-muted rounded-2xl p-1.5 mb-7">
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
                  <InputField label="Full Name" icon={User} value={name} onChange={setName} />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField label="Email" icon={Mail} type="email" value={email} onChange={setEmail} required />

            <InputField label="Password" icon={Lock} type={showPassword ? "text" : "password"} value={password} onChange={setPassword} required>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </InputField>

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
              whileHover={{ scale: 1.02, boxShadow: "0 16px 48px -4px hsl(217 91% 60% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
