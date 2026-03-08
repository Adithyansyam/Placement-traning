import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, AlertTriangle, TrendingUp, Clock, Eye
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

const READINESS = 68;

const STRONG = ["Aptitude", "Verbal", "Logical Reasoning"];
const WEAK = ["Coding", "DBMS", "System Design"];

const SCORE_DATA = [
  { test: "Mock 1", score: 55 },
  { test: "Mock 2", score: 62 },
  { test: "Mock 3", score: 58 },
  { test: "Mock 4", score: 71 },
  { test: "Mock 5", score: 65 },
  { test: "Mock 6", score: 74 },
  { test: "Mock 7", score: 70 },
  { test: "Mock 8", score: 78 },
  { test: "Mock 9", score: 82 },
  { test: "Mock 10", score: 76 },
];

const TOPIC_ACC = [
  { topic: "Aptitude", accuracy: 85 },
  { topic: "Verbal", accuracy: 78 },
  { topic: "Logical", accuracy: 80 },
  { topic: "Coding", accuracy: 52 },
  { topic: "DBMS", accuracy: 45 },
  { topic: "System Design", accuracy: 38 },
  { topic: "Networking", accuracy: 65 },
];

const TIME_SPENT = [
  { name: "Aptitude", value: 30 },
  { name: "Coding", value: 25 },
  { name: "Verbal", value: 15 },
  { name: "DBMS", value: 12 },
  { name: "System Design", value: 10 },
  { name: "Other", value: 8 },
];

const PIE_COLORS = [
  "hsl(258,90%,62%)",
  "hsl(280,80%,58%)",
  "hsl(310,70%,65%)",
  "hsl(258,60%,75%)",
  "hsl(215,50%,42%)",
  "hsl(210,40%,75%)",
];

const HISTORY = [
  { name: "TCS Full Mock", type: "Company", date: "2026-03-01", score: 82, total: 100 },
  { name: "Aptitude Sprint", type: "Aptitude", date: "2026-02-27", score: 74, total: 100 },
  { name: "Infosys Pattern", type: "Company", date: "2026-02-24", score: 68, total: 100 },
  { name: "DSA Challenge", type: "Technical", date: "2026-02-20", score: 45, total: 100 },
  { name: "Full Mock 3", type: "Full Mock", date: "2026-02-17", score: 71, total: 100 },
  { name: "Verbal Reasoning", type: "Aptitude", date: "2026-02-14", score: 88, total: 100 },
  { name: "DBMS Concepts", type: "Technical", date: "2026-02-10", score: 52, total: 100 },
  { name: "Wipro Prep", type: "Company", date: "2026-02-07", score: 63, total: 100 },
];

const FILTERS = ["This Week", "This Month", "All Time"] as const;

function ScoreRing({ value }: { value: number }) {
  const r = 70, stroke = 12;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={180} height={180} className="mx-auto">
      <circle cx={90} cy={90} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
      <motion.circle
        cx={90} cy={90} r={r} fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        transform="rotate(-90 90 90)"
      />
      <text x={90} y={82} textAnchor="middle" className="fill-foreground text-3xl font-bold">{value}%</text>
      <text x={90} y={102} textAnchor="middle" className="fill-muted-foreground text-xs">Readiness</text>
    </svg>
  );
}

function scoreBadge(score: number) {
  if (score >= 70) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export default function Progress() {
  const [timeFilter, setTimeFilter] = useState<typeof FILTERS[number]>("All Time");

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground">My Progress</h1>
        </motion.div>

        {/* Row 1 — Readiness */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center"
          >
            <p className="text-sm font-semibold text-muted-foreground mb-4">Placement Readiness</p>
            <ScoreRing value={READINESS} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Strong Areas
            </h3>
            <ul className="space-y-3">
              {STRONG.map(s => (
                <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Weak Areas
            </h3>
            <ul className="space-y-3">
              {WEAK.map(w => (
                <li key={w} className="flex items-center gap-2 text-sm text-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-500" /> {w}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Row 2 — Score Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Performance Over Last 10 Tests
            </h3>
            <div className="flex gap-1">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    timeFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SCORE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="test" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone" dataKey="score"
                  stroke="hsl(var(--primary))" strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Row 3 — Topic Accuracy */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Topic-wise Accuracy %</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOPIC_ACC} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis type="category" dataKey="topic" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={90} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8, fontSize: 12,
                    }}
                  />
                  <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Time Spent by Category
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TIME_SPENT} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" outerRadius={80} innerRadius={40}
                    paddingAngle={3}
                  >
                    {TIME_SPENT.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8, fontSize: 12,
                    }}
                    formatter={(v: number) => `${v}%`}
                  />
                  <Legend
                    verticalAlign="bottom"
                    formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Row 4 — Test History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-6 pb-4">
            <h3 className="font-semibold text-foreground">Test History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Test Name</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Type</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Score</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((h, i) => {
                  const pct = Math.round((h.score / h.total) * 100);
                  return (
                    <tr
                      key={i}
                      className={`border-b border-border ${i % 2 === 1 ? "bg-secondary/40" : ""}`}
                    >
                      <td className="px-6 py-3 font-medium text-foreground">{h.name}</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {h.type}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">{h.date}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${scoreBadge(pct)}`}>
                          {h.score}/{h.total}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {pct >= 50 ? "Passed" : "Failed"}
                      </td>
                      <td className="px-6 py-3">
                        <button className="text-primary hover:underline text-xs font-medium flex items-center gap-1">
                          <Eye className="w-3 h-3" /> View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
