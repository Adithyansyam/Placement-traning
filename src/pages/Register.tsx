import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, ArrowLeft, X, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BRANCHES = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];
const SKILL_SUGGESTIONS = ["Python", "Java", "DSA", "SQL", "React"];

const getStrength = (pw: string) => {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0-5
};

const strengthLabel = (s: number) =>
  s <= 1 ? "Weak" : s <= 3 ? "Medium" : "Strong";
const strengthColor = (s: number) =>
  s <= 1 ? "bg-destructive" : s <= 3 ? "bg-yellow-400" : "bg-green-500";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2
  const [branch, setBranch] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!branch) errs.branch = "Select your branch";
    if (!cgpa) errs.cgpa = "CGPA is required";
    else if (parseFloat(cgpa) < 0 || parseFloat(cgpa) > 10) errs.cgpa = "CGPA must be between 0 and 10";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 10) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const strength = getStrength(password);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-center items-center px-16 relative overflow-hidden"
        style={{ backgroundColor: "hsl(224, 76%, 40%)" }}
      >
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 -top-32 -left-32" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5 bottom-20 -right-20" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.03] top-1/2 left-10" />

        <motion.div
          className="relative z-10 max-w-md"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2.5 mb-8">
            <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-white tracking-tight">PlacePrep</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Join 1000+<br />Students Preparing<br />Smarter
          </h1>
          <p className="mt-4 text-white/60 text-base leading-relaxed">
            Create your account and get access to structured placement preparation — aptitude, coding, mock tests, and more.
          </p>
          <div className="mt-10 flex items-center gap-4">
            {[
              { value: "6", label: "Modules" },
              { value: "500+", label: "Questions" },
              { value: "Free", label: "To Start" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Zap className="w-6 h-6 text-primary" strokeWidth={2.5} />
            <span className="text-lg font-bold text-primary">PlacePrep</span>
          </div>

          {/* Success banner */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-3 text-sm font-semibold"
              >
                <CheckCircle2 className="w-5 h-5" />
                Account created! Redirecting to dashboard...
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg" style={{ borderRadius: 16 }}>
            <h2 className="text-2xl font-extrabold text-foreground mb-1">Create Your Account</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Step {step} of 2 — {step === 1 ? "Basic Info" : "Academic Info"}
            </p>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => { setName(e.target.value); clearError("name"); }}
                          placeholder="John Doe"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.name ? "border-destructive" : "border-border"}`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-destructive mt-1 font-medium">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                          placeholder="you@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.email ? "border-destructive" : "border-border"}`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-destructive mt-1 font-medium">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.password ? "border-destructive" : "border-border"}`}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-destructive mt-1 font-medium">{errors.password}</p>}
                      {password && (
                        <div className="mt-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor(strength) : "bg-muted"}`} />
                            ))}
                          </div>
                          <p className={`text-xs mt-1 font-medium ${strength <= 1 ? "text-destructive" : strength <= 3 ? "text-yellow-500" : "text-green-600"}`}>
                            {strengthLabel(strength)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.confirmPassword ? "border-destructive" : "border-border"}`}
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-xs text-destructive mt-1 font-medium">{errors.confirmPassword}</p>}
                    </div>

                    <Button type="button" onClick={handleContinue} className="w-full h-12 font-semibold text-sm shadow-md shadow-primary/20 gap-2 rounded-xl">
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Branch */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Branch / Department</label>
                      <select
                        value={branch}
                        onChange={(e) => { setBranch(e.target.value); clearError("branch"); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none ${errors.branch ? "border-destructive" : "border-border"} ${!branch ? "text-muted-foreground" : ""}`}
                      >
                        <option value="">Select branch</option>
                        {BRANCHES.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      {errors.branch && <p className="text-xs text-destructive mt-1 font-medium">{errors.branch}</p>}
                    </div>

                    {/* CGPA */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={cgpa}
                        onChange={(e) => { setCgpa(e.target.value); clearError("cgpa"); }}
                        placeholder="e.g. 8.5"
                        className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.cgpa ? "border-destructive" : "border-border"}`}
                      />
                      {errors.cgpa && <p className="text-xs text-destructive mt-1 font-medium">{errors.cgpa}</p>}
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Skills</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skills.map((s) => (
                          <span key={s} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                            {s}
                            <button type="button" onClick={() => removeSkill(s)} className="hover:text-destructive transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); }
                        }}
                        placeholder="Type a skill and press Enter"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                      {skills.length === 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {SKILL_SUGGESTIONS.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => addSkill(s)}
                              className="text-xs border border-border text-muted-foreground px-2.5 py-1 rounded-full hover:border-primary hover:text-primary transition-colors"
                            >
                              + {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-1">
                      <Button type="button" variant="outline" onClick={() => { setStep(1); setErrors({}); }} className="h-12 px-5 rounded-xl font-semibold gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </Button>
                      <Button type="submit" disabled={isLoading} className="flex-1 h-12 font-semibold text-sm shadow-md shadow-primary/20 gap-2 rounded-xl">
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <>Create Account <ArrowRight className="w-4 h-4" /></>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider + Login link */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button type="button" onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">
                  Login
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
