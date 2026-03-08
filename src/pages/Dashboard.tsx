import { motion } from "framer-motion";
import {
  ClipboardCheck, Code, BookOpen, BarChart3, Brain, Building2,
  ArrowRight, Zap, Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { icon: ClipboardCheck, title: "Mock Tests", description: "Simulate real placement exams with timed assessments and instant scoring." },
  { icon: Code, title: "Coding Challenges", description: "Practice DSA and problem-solving across all major difficulty levels." },
  { icon: BookOpen, title: "Study Materials", description: "Curated notes, video lectures, and references for every placement topic." },
  { icon: BarChart3, title: "Progress Tracking", description: "Visualize your growth with analytics dashboards and streak tracking." },
  { icon: Brain, title: "Skill Gap AI", description: "AI-powered analysis to identify weak areas and suggest targeted practice." },
  { icon: Building2, title: "Company Prep", description: "Access previous papers and patterns from top recruiting companies." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background mesh-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold gradient-text tracking-tight">PlacePrep</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground font-medium" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button className="font-semibold gradient-bg border-0 shadow-lg shadow-primary/25 hover:opacity-90" onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-[15%] w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10 flex items-center gap-16">
          <div className="flex-1 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Placement Prep
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.08] tracking-tight">
                Crack Your
                <br />
                <span className="gradient-text">Dream Placement.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Structured prep for aptitude, coding, mock tests, and company-wise materials — built for engineering students.
              </p>
            </motion.div>

            <motion.div className="mt-10 flex items-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Button size="lg" className="font-semibold px-7 h-12 text-base gradient-bg border-0 shadow-lg shadow-primary/25 gap-2 hover:opacity-90" onClick={() => navigate("/login")}>
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="font-semibold px-7 h-12 text-base glass-card border-border/50 hover:bg-muted/60">
                See How It Works
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div className="mt-12 flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="flex -space-x-2">
                {["A", "P", "R", "S"].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background"
                    style={{ opacity: 1 - i * 0.15 }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">10,000+ Students</p>
                <p className="text-xs text-muted-foreground">already preparing with PlacePrep</p>
              </div>
            </motion.div>
          </div>

          {/* Hero mockup */}
          <motion.div className="flex-1 hidden lg:block" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="relative">
              <div className="glass-card rounded-2xl p-6 border border-border/30">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Tests Taken", value: "124" },
                    { label: "Accuracy", value: "87%" },
                    { label: "Streak", value: "14 days" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-secondary rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5">
                  {[85, 72, 93, 64, 78].map((pct, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16 text-right">
                        {["Aptitude", "Coding", "Verbal", "Quant", "Logic"][i]}
                      </span>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground w-8">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating card */}
              <motion.div
                className="absolute -bottom-4 -left-6 glass-card rounded-xl p-3 flex items-center gap-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">AI Insight</div>
                  <div className="text-[10px] text-muted-foreground">Focus on Quant this week</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="absolute inset-0 gradient-subtle-bg" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Six powerful modules designed to prepare you for every step of the placement process.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group glass-card rounded-2xl p-6 card-hover cursor-pointer relative overflow-hidden border border-border/30"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-subtle)" }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl gradient-subtle-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden py-12">
        <div className="absolute inset-0 gradient-bg opacity-95" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
            <span className="font-bold text-lg text-primary-foreground">PlacePrep</span>
          </div>
          <p className="text-primary-foreground/50 text-sm">
            PlacePrep © 2026 — Built for Students, by Students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
