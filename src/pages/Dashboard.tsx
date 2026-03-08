import { motion } from "framer-motion";
import {
  ClipboardCheck, Code, BookOpen, BarChart3, Brain, Building2,
  ArrowRight, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ClipboardCheck,
    title: "Mock Tests",
    description: "Simulate real placement exams with timed assessments and instant scoring.",
  },
  {
    icon: Code,
    title: "Coding Challenges",
    description: "Practice DSA and problem-solving across all major difficulty levels.",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    description: "Curated notes, video lectures, and references for every placement topic.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your growth with analytics dashboards and streak tracking.",
  },
  {
    icon: Brain,
    title: "Skill Gap AI Analyzer",
    description: "AI-powered analysis to identify weak areas and suggest targeted practice.",
  },
  {
    icon: Building2,
    title: "Company-wise Prep",
    description: "Access previous papers and patterns from top recruiting companies.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-primary" strokeWidth={2.5} />
            <span className="text-lg font-bold text-primary tracking-tight">PlacePrep</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-muted-foreground font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="font-semibold shadow-md shadow-primary/20"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10 flex items-center gap-16">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight">
                Crack Your Placement.{" "}
                <br />
                <span className="text-primary">All in One Place.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Structured prep for aptitude, coding, mock tests, and company-wise materials — built for engineering students.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="font-semibold px-7 h-12 text-base shadow-lg shadow-primary/25 gap-2"
                onClick={() => navigate("/login")}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-7 h-12 text-base border-primary text-primary hover:bg-accent"
              >
                See How It Works
              </Button>
            </motion.div>
          </div>

          {/* Right — Dashboard mockup */}
          <motion.div
            className="flex-1 hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative">
              {/* Main mockup card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/50" />
                </div>
                {/* Mock stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Tests Taken", value: "124" },
                    { label: "Accuracy", value: "87%" },
                    { label: "Streak", value: "14 days" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-accent rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
                {/* Mock chart bars */}
                <div className="space-y-2.5">
                  {[85, 72, 93, 64, 78].map((pct, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16 text-right">
                        {["Aptitude", "Coding", "Verbal", "Quant", "Logic"][i]}
                      </span>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
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
              {/* Floating accent card */}
              <motion.div
                className="absolute -bottom-4 -left-6 bg-card border border-border rounded-xl p-3 shadow-lg flex items-center gap-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
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

      {/* Features Section */}
      <section className="py-24 bg-accent/50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Six powerful modules designed to prepare you for every step of the placement process.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group bg-card rounded-xl p-6 border border-border hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Blue left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/0 group-hover:bg-primary transition-colors duration-300 rounded-l-xl" />

                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="font-bold text-lg text-background">PlacePrep</span>
          </div>
          <p className="text-background/50 text-sm">
            PlacePrep © 2025 — Built for Students, by Students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
