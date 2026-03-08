import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ClipboardCheck, Target, Flame, Gauge, ArrowRight, Calendar,
  BookOpen, Code2, TrendingUp, Sparkles
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

const scoreData = [
  { test: "Test 1", score: 58 }, { test: "Test 2", score: 65 },
  { test: "Test 3", score: 62 }, { test: "Test 4", score: 74 },
  { test: "Test 5", score: 70 }, { test: "Test 6", score: 78 },
  { test: "Test 7", score: 72 }, { test: "Test 8", score: 82 },
];

const stats = [
  { icon: ClipboardCheck, label: "Tests Taken", value: "14", color: "from-primary to-primary/70" },
  { icon: Target, label: "Average Score", value: "72%", color: "from-purple-500 to-pink-500" },
  { icon: Flame, label: "Study Streak", value: "5 days 🔥", color: "from-orange-500 to-red-500" },
  { icon: Gauge, label: "Readiness Score", value: "68%", color: "from-emerald-500 to-teal-500" },
];

const upcomingTests = [
  { name: "TCS NQT Mock", type: "Aptitude", date: "Mar 14, 2026" },
  { name: "DSA Challenge #5", type: "Coding", date: "Mar 16, 2026" },
  { name: "Infosys SP Mock", type: "Full Test", date: "Mar 18, 2026" },
];

const quickActions = [
  { icon: BookOpen, label: "Study Materials", path: "/study-materials", gradient: "from-primary to-indigo-400" },
  { icon: Code2, label: "Coding Practice", path: "/coding", gradient: "from-purple-500 to-pink-500" },
  { icon: TrendingUp, label: "View Progress", path: "/progress", gradient: "from-emerald-500 to-teal-500" },
  { icon: Sparkles, label: "Skill Gap Analysis", path: "/skill-gap", gradient: "from-amber-500 to-orange-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <main className="pt-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-6 py-8 space-y-6"
        >
          {/* Welcome Banner */}
          <motion.div
            variants={item}
            className="rounded-2xl p-8 text-primary-foreground relative overflow-hidden gradient-bg"
          >
            {/* Animated orbs */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/[0.07] -translate-y-1/3 translate-x-1/4 blur-2xl"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 left-1/3 w-52 h-52 rounded-full bg-white/[0.06] translate-y-1/2 blur-xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-white/[0.04] blur-lg"
            />
            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-3xl font-extrabold tracking-tight"
              >
                Good morning, Rahul 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
                className="mt-2 text-primary-foreground/80 text-sm max-w-md"
              >
                Your next placement drive is in 12 days. Keep preparing!
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="glass-card rounded-2xl p-5 border border-border/30 cursor-default group"
              >
                <div className="flex items-center gap-3.5">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg shadow-primary/10`}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                      className="text-2xl font-extrabold text-foreground"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div variants={item}>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(action.path)}
                  className="glass-card rounded-xl p-4 border border-border/30 flex items-center gap-3 text-left group transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {action.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Two Columns */}
          <div className="grid lg:grid-cols-5 gap-6">
            <motion.div
              variants={item}
              className="lg:col-span-3 glass-card rounded-2xl p-6 border border-border/30"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-extrabold text-foreground">Score Trend</h2>
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full font-medium">Last 8 tests</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scoreData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                    <XAxis dataKey="test" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        backdropFilter: "blur(16px)",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: "0 8px 32px -8px hsl(var(--primary) / 0.15)",
                      }}
                      formatter={(value: number) => [`${value}%`, "Score"]}
                    />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#scoreGradient)" dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--card))" }} activeDot={{ r: 6, strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="lg:col-span-2 glass-card rounded-2xl p-6 border border-border/30"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-extrabold text-foreground">Upcoming Tests</h2>
                <span className="text-xs text-primary font-semibold cursor-pointer hover:underline" onClick={() => navigate("/mock-tests")}>View all</span>
              </div>
              <div className="space-y-3">
                {upcomingTests.map((test, i) => (
                  <motion.div
                    key={test.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/20 flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-foreground truncate">{test.name}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{test.type}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {test.date}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="shrink-0 text-xs font-semibold h-8 px-3 gap-1 rounded-lg gradient-bg border-0 hover:opacity-90 shadow-md shadow-primary/20"
                      onClick={() => navigate("/mock-tests")}
                    >
                      Attempt <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
