import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Target, Zap, BookOpen, Brain, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

const STATS = [
  { icon: Trophy, label: "Students Placed", value: "4,200+", color: "from-amber-400 to-orange-500" },
  { icon: Target, label: "Success Rate", value: "94%", color: "from-emerald-400 to-teal-500" },
  { icon: Zap, label: "Mock Tests", value: "12K+", color: "from-violet-400 to-purple-500" },
  { icon: TrendingUp, label: "Avg Score Boost", value: "+38%", color: "from-blue-400 to-cyan-500" },
];

const FEATURES = [
  { icon: BookOpen, label: "Study Materials", to: "/study-materials", desc: "Curated resources for every topic", color: "from-violet-500 to-purple-600" },
  { icon: Brain, label: "Skill Gap AI", to: "/skill-gap", desc: "Identify and bridge your gaps", color: "from-blue-500 to-cyan-600" },
  { icon: Target, label: "Mock Tests", to: "/mock-tests", desc: "Real exam simulations", color: "from-emerald-500 to-teal-600" },
  { icon: Sparkles, label: "AI Assistant", to: "/ai", desc: "Gemini-powered coaching", color: "from-amber-500 to-orange-600" },
];

// Floating particles component
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// Animated quote cycler
const QuoteCycler = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center"
      >
        <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold gradient-text leading-tight mb-4">
          "{QUOTES[index].text}"
        </p>
        <p className="text-muted-foreground text-base md:text-lg font-medium tracking-widest uppercase">
          — {QUOTES[index].author}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name?.split(" ")[0] || "there";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 30);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DashboardNav />

      {/* Hero Section */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-14 overflow-hidden"
      >
        {/* Animated background orbs */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-400/10 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-pink-400/10 blur-3xl pointer-events-none"
        />

        {/* Floating particles */}
        <Particles />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />


        {/* Motivational Quote — center of page */}
        <div className="max-w-4xl mx-auto mb-10 z-10 relative">
          <QuoteCycler />
        </div>

        {/* Quote indicator dots */}
        <div className="flex gap-2 mb-10">
          {QUOTES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === Math.floor(Date.now() / 5000) % QUOTES.length ? 24 : 8 }}
              className="h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center z-10 relative mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/study-materials")}
            className="gradient-bg text-white font-semibold px-7 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
          >
            Start Preparing <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/ai")}
            className="glass-card border border-primary/30 text-primary font-semibold px-7 py-3 rounded-xl flex items-center gap-2 hover:bg-primary/5 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> AI Coach
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
        >
          <div className="w-5 h-9 rounded-full border-2 border-current flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-current"
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest">scroll</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Trusted by <span className="gradient-text">thousands</span> of students
            </h2>
            <p className="text-muted-foreground text-lg">Real results from real students who prepared with PlacePrep</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 mesh-bg relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Everything you need to <span className="gradient-text">get placed</span>
            </h2>
            <p className="text-muted-foreground text-lg">All tools in one place, designed for your success</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => navigate(f.to)}
                className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base">{f.label}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{f.desc}</p>
                <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.07]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Your dream job is <span className="gradient-text">one step away.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start your preparation today. Every minute you study brings you closer to your offer letter.
          </p>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/study-materials")}
            className="gradient-bg text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all inline-flex items-center gap-2"
          >
            Start Now <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
