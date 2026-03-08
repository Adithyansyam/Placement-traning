import { motion } from "framer-motion";
import {
  ClipboardCheck, Target, Flame, Gauge, ArrowRight, Calendar
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

const scoreData = [
  { test: "Test 1", score: 58 },
  { test: "Test 2", score: 65 },
  { test: "Test 3", score: 62 },
  { test: "Test 4", score: 74 },
  { test: "Test 5", score: 70 },
  { test: "Test 6", score: 78 },
  { test: "Test 7", score: 72 },
  { test: "Test 8", score: 82 },
];

const stats = [
  { icon: ClipboardCheck, label: "Tests Taken", value: "14", accent: false },
  { icon: Target, label: "Average Score", value: "72%", accent: false },
  { icon: Flame, label: "Study Streak", value: "5 days 🔥", accent: false },
  { icon: Gauge, label: "Readiness Score", value: "68%", accent: false },
];

const upcomingTests = [
  { name: "TCS NQT Mock", type: "Aptitude", date: "Mar 14, 2026", color: "bg-primary/10 text-primary" },
  { name: "DSA Challenge #5", type: "Coding", date: "Mar 16, 2026", color: "bg-green-100 text-green-700" },
  { name: "Infosys SP Mock", type: "Full Test", date: "Mar 18, 2026", color: "bg-orange-100 text-orange-700" },
];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-accent/30">
      <DashboardNav />

      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 text-primary-foreground relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(224 76% 40%))",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-1/2 w-40 h-40 rounded-full bg-white/5 translate-y-1/2" />
            <div className="relative z-10">
              <h1 className="text-2xl font-extrabold">Good morning, Rahul 👋</h1>
              <p className="mt-1 text-primary-foreground/70 text-sm">
                Your next placement drive is in 12 days. Keep preparing!
              </p>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-5 shadow-sm"
                style={{ borderRadius: 12 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Two Columns */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Score Trend — 60% */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 bg-card rounded-xl border border-border p-6 shadow-sm"
              style={{ borderRadius: 12 }}
            >
              <h2 className="text-base font-extrabold text-foreground mb-4">Score Trend</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="test"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[40, 100]}
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [`${value}%`, "Score"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--card))" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Upcoming Tests — 40% */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm"
              style={{ borderRadius: 12 }}
            >
              <h2 className="text-base font-extrabold text-foreground mb-4">Upcoming Tests</h2>
              <div className="space-y-3">
                {upcomingTests.map((test) => (
                  <div
                    key={test.name}
                    className="p-4 rounded-xl border border-border bg-background flex items-center justify-between gap-3"
                    style={{ borderRadius: 12 }}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-foreground truncate">{test.name}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${test.color}`}>
                          {test.type}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {test.date}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="shrink-0 text-xs font-semibold h-8 px-3 gap-1 rounded-lg">
                      Attempt <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
