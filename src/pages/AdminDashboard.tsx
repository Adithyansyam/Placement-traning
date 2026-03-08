import { useState } from "react";
import AdminNav from "@/components/AdminNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, FileText, ClipboardList, TrendingUp, Clock, Eye, Search, X } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const STATS = [
  { label: "Total Students", value: "342", icon: Users },
  { label: "Tests Published", value: "18", icon: ClipboardList },
  { label: "Materials Uploaded", value: "56", icon: FileText },
  { label: "Avg Readiness Score", value: "64%", icon: TrendingUp },
];

const BRANCH_DATA = [
  { branch: "CSE", score: 72 },
  { branch: "ECE", score: 58 },
  { branch: "EEE", score: 52 },
  { branch: "MECH", score: 45 },
  { branch: "IT", score: 66 },
];

const PERF_DATA = [
  { name: "Excellent", value: 45 },
  { name: "Good", value: 120 },
  { name: "Average", value: 110 },
  { name: "Below Average", value: 67 },
];

const PIE_COLORS = [
  "hsl(217 91% 48%)",
  "hsl(217 91% 60%)",
  "hsl(217 70% 72%)",
  "hsl(217 50% 84%)",
];

const ACTIVITY = [
  { time: "2 min ago", text: "New test published: TCS Mock Test 3" },
  { time: "15 min ago", text: "42 students attempted Aptitude Test" },
  { time: "1 hour ago", text: "Study material uploaded: OS Notes" },
  { time: "3 hours ago", text: "Readiness report generated for CSE branch" },
  { time: "5 hours ago", text: "New student registered: Priya Verma" },
  { time: "Yesterday", text: "Mock Test 2 results published" },
];

const STUDENTS = [
  { name: "Arjun Sharma", roll: "21CS3045", branch: "CSE", cgpa: 8.4, tests: 12, avg: 78, readiness: 72 },
  { name: "Priya Verma", roll: "21CS3012", branch: "CSE", cgpa: 9.1, tests: 15, avg: 85, readiness: 81 },
  { name: "Rahul Singh", roll: "21EC2034", branch: "ECE", cgpa: 7.6, tests: 8, avg: 62, readiness: 55 },
  { name: "Ananya Patel", roll: "21CS3067", branch: "CSE", cgpa: 8.8, tests: 14, avg: 82, readiness: 78 },
  { name: "Vikram Joshi", roll: "21EE1023", branch: "EEE", cgpa: 7.2, tests: 6, avg: 58, readiness: 48 },
  { name: "Sneha Reddy", roll: "21IT4056", branch: "IT", cgpa: 8.0, tests: 10, avg: 71, readiness: 65 },
  { name: "Karthik Nair", roll: "21ME5078", branch: "MECH", cgpa: 7.8, tests: 7, avg: 55, readiness: 42 },
  { name: "Divya Gupta", roll: "21CS3089", branch: "CSE", cgpa: 9.3, tests: 16, avg: 88, readiness: 85 },
  { name: "Aditya Kumar", roll: "21EC2045", branch: "ECE", cgpa: 7.4, tests: 9, avg: 64, readiness: 58 },
  { name: "Meera Iyer", roll: "21IT4023", branch: "IT", cgpa: 8.6, tests: 11, avg: 75, readiness: 70 },
];

type TabKey = "overview" | "students";

const AdminDashboard = () => {
  const [tab, setTab] = useState<TabKey>("overview");
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const filtered = STUDENTS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branchFilter === "all" || s.branch === branchFilter;
    return matchSearch && matchBranch;
  });

  const scoreBadge = (score: number) => {
    if (score >= 70) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Simple tab switcher using nav links — we handle overview & students inline */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={tab === "overview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("overview")}
          >Overview</Button>
          <Button
            variant={tab === "students" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("students")}
          >Manage Students</Button>
        </div>

        {tab === "overview" && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {STATS.map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-5">
                    <s.icon className="h-5 w-5 text-primary mb-3" />
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts + Activity */}
            <div className="grid lg:grid-cols-5 gap-6 mb-6">
              {/* Bar Chart */}
              <Card className="lg:col-span-3">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-4">Branch-wise Readiness Scores</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={BRANCH_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                      <XAxis dataKey="branch" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0 0% 100%)",
                          border: "1px solid hsl(214 32% 91%)",
                          borderRadius: 8,
                          fontSize: 13,
                        }}
                      />
                      <Bar dataKey="score" fill="hsl(217 91% 60%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card className="lg:col-span-2">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-4">Student Performance Distribution</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={PERF_DATA} cx="50%" cy="45%" outerRadius={85} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                        {PERF_DATA.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Activity Feed */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{a.text}</p>
                        <p className="text-xs text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {tab === "students" && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-4">Manage Students</h2>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or roll no…"
                  className="pl-9"
                />
              </div>
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Branch" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {["CSE", "ECE", "EEE", "MECH", "IT"].map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      {["Name", "Roll No", "Branch", "CGPA", "Tests", "Avg Score", "Readiness", "Action"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => (
                      <tr key={s.roll} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                        <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                        <td className="px-4 py-3"><Badge variant="secondary">{s.branch}</Badge></td>
                        <td className="px-4 py-3 text-foreground">{s.cgpa}</td>
                        <td className="px-4 py-3 text-foreground">{s.tests}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${scoreBadge(s.avg)}`}>{s.avg}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${scoreBadge(s.readiness)}`}>{s.readiness}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => setSelectedStudent(s)}>
                            <Eye className="h-3.5 w-3.5" /> View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Student Detail Modal */}
            <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Student Details</DialogTitle>
                </DialogHeader>
                {selectedStudent && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {selectedStudent.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{selectedStudent.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedStudent.roll} • {selectedStudent.branch}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "CGPA", value: selectedStudent.cgpa },
                        { label: "Tests Taken", value: selectedStudent.tests },
                        { label: "Avg Score", value: `${selectedStudent.avg}%` },
                        { label: "Readiness", value: `${selectedStudent.readiness}%` },
                      ].map((item) => (
                        <div key={item.label} className="bg-muted/50 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-foreground">{item.value}</p>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Performance</p>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${selectedStudent.readiness}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{selectedStudent.readiness}% placement ready</p>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
