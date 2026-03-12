import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Target, Zap, BookOpen, Brain, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

const STATS = [
  { icon: Trophy, label: "Placed", value: "4,200+", color: "#f59e0b" },
  { icon: Target, label: "Success Rate", value: "94%", color: "#10b981" },
  { icon: Zap, label: "Mock Tests", value: "12K+", color: "#8b5cf6" },
  { icon: TrendingUp, label: "Score Boost", value: "+38%", color: "#3b82f6" },
];

const FEATURES = [
  { icon: BookOpen, label: "Study Materials", to: "/study-materials", desc: "Curated resources for every topic", color: "from-violet-500 to-purple-600" },
  { icon: Brain, label: "Skill Gap AI", to: "/skill-gap", desc: "Identify and bridge your gaps", color: "from-blue-500 to-cyan-600" },
  { icon: Target, label: "Mock Tests", to: "/mock-tests", desc: "Real exam simulations", color: "from-emerald-500 to-teal-600" },
  { icon: Sparkles, label: "AI Assistant", to: "/ai", desc: "Gemini-powered coaching", color: "from-amber-500 to-orange-600" },
];

const Home = () => {
  const navigate = useNavigate();
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setQuoteIdx((i) => (i + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 40);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 40);
  };

  const prev = () => { setDirection(-1); setQuoteIdx((i) => (i - 1 + QUOTES.length) % QUOTES.length); };
  const next = () => { setDirection(1); setQuoteIdx((i) => (i + 1) % QUOTES.length); };

  const q = QUOTES[quoteIdx];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      {/* ── HERO ── */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14"
        style={{
          background: "linear-gradient(135deg, hsl(258 30% 6%) 0%, hsl(270 25% 10%) 50%, hsl(290 20% 8%) 100%)",
        }}
      >
        {/* Glow orbs */}
        <motion.div style={{ x: springX, y: springY }} className="absolute top-20 left-10 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(258 90% 62% / 0.25) 0%, transparent 70%)" }} />
        <motion.div style={{ x: springX, y: springY }} className="absolute bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(310 70% 60% / 0.2) 0%, transparent 70%)" }} />
        <motion.div style={{ x: springX, y: springY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(280 80% 58% / 0.08) 0%, transparent 70%)" }} />

        {/* Dotted grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, hsl(258 90% 80% / 0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />


        {/* Quote card */}
        <div className="relative w-full max-w-4xl mx-auto px-6">
          {/* Nav arrows */}
          <button onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: "hsl(258 90% 62% / 0.15)", border: "1px solid hsl(258 90% 62% / 0.3)", color: "hsl(258 90% 80%)" }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: "hsl(258 90% 62% / 0.15)", border: "1px solid hsl(258 90% 62% / 0.3)", color: "hsl(258 90% 80%)" }}>
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Quote box */}
          <div className="mx-14 rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: "hsl(258 30% 10% / 0.8)", border: "1px solid hsl(258 90% 62% / 0.2)", backdropFilter: "blur(20px)" }}>
            {/* Decorative corner glow */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(258 90% 62% / 0.3) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(310 70% 60% / 0.2) 0%, transparent 70%)" }} />

            {/* Open quote */}
            <div className="text-9xl font-serif leading-none mb-0 select-none" style={{ color: "hsl(258 90% 62% / 0.3)", lineHeight: "0.6", marginBottom: "1rem" }}>"</div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={quoteIdx}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug mb-6"
                  style={{ background: "linear-gradient(135deg, #fff 0%, hsl(258 80% 85%) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {q.text}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12" style={{ background: "hsl(258 90% 62% / 0.5)" }} />
                  <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "hsl(258 80% 75%)" }}>
                    {q.author}
                  </p>
                  <div className="h-px w-12" style={{ background: "hsl(258 90% 62% / 0.5)" }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {QUOTES.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > quoteIdx ? 1 : -1); setQuoteIdx(i); }}
                className="rounded-full transition-all duration-300"
                style={{ width: i === quoteIdx ? 24 : 8, height: 8, background: i === quoteIdx ? "hsl(258 90% 62%)" : "hsl(258 90% 62% / 0.3)" }} />
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-12 z-10">
          <motion.button whileHover={{ scale: 1.06, boxShadow: "0 20px 40px hsl(258 90% 62% / 0.4)" }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/study-materials")}
            className="flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-white text-base transition-all"
            style={{ background: "linear-gradient(135deg, hsl(258 90% 62%), hsl(280 80% 58%), hsl(310 70% 60%))", boxShadow: "0 8px 24px hsl(258 90% 62% / 0.3)" }}>
            Start Preparing <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/ai")}
            className="flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm transition-all"
            style={{ border: "1px solid hsl(258 90% 62% / 0.5)", background: "hsl(258 90% 62% / 0.1)", color: "hsl(258 80% 85%)", backdropFilter: "blur(10px)" }}>
            <Sparkles className="w-4 h-4" /> AI Coach
          </motion.button>
        </motion.div>

        {/* Stat strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-14 mb-8 z-10">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}22` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-lg font-extrabold text-white leading-none">{s.value}</p>
                <p className="text-xs" style={{ color: "hsl(258 30% 60%)" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Everything You Need</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              One platform to get <span className="gradient-text">placed faster</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(f.to)}
                className="relative glass-card rounded-2xl p-6 cursor-pointer group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-1 text-base">{f.label}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{f.desc}</p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5 gradient-bg" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Your dream job is <span className="gradient-text">one step away.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Every minute you prepare brings you closer to your offer letter.
          </p>
          <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/study-materials")}
            className="gradient-bg text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-xl shadow-primary/30 inline-flex items-center gap-2">
            Start Now <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
