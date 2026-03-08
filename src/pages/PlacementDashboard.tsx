import { useState } from "react";
import PlacementNav from "@/components/PlacementNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, Building2, UserCheck, IndianRupee, Plus, Pencil, Trash2, Download } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type ViewKey = "overview" | "drives" | "reports";

const STATS = [
  { label: "Registered Students", value: "342", icon: Users },
  { label: "Companies Visiting", value: "12", icon: Building2 },
  { label: "Placed Students", value: "156", icon: UserCheck },
  { label: "Avg Package", value: "₹8.2 LPA", icon: IndianRupee },
];

const MONTH_DATA = [
  { month: "Sep", count: 12 }, { month: "Oct", count: 28 }, { month: "Nov", count: 35 },
  { month: "Dec", count: 22 }, { month: "Jan", count: 30 }, { month: "Feb", count: 29 },
];

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-primary/10 text-primary border-primary/20",
  Ongoing: "bg-green-100 text-green-700 border-green-200",
  Completed: "bg-muted text-muted-foreground border-border",
};

const UPCOMING_DRIVES = [
  { company: "TCS", date: "2026-03-15", eligibility: "CGPA ≥ 7.0", registered: 120, status: "Upcoming" },
  { company: "Infosys", date: "2026-03-18", eligibility: "CGPA ≥ 6.5", registered: 145, status: "Upcoming" },
  { company: "Amazon", date: "2026-03-10", eligibility: "CGPA ≥ 8.0", registered: 65, status: "Ongoing" },
  { company: "Wipro", date: "2026-02-28", eligibility: "CGPA ≥ 6.0", registered: 180, status: "Completed" },
  { company: "Google", date: "2026-03-25", eligibility: "CGPA ≥ 8.5", registered: 42, status: "Upcoming" },
];

const BRANCHES = ["CSE", "ECE", "EEE", "MECH", "IT"];

interface Drive {
  company: string; date: string; eligibility: string; cgpa: string;
  branches: string[]; rounds: string; pkg: string; deadline: string; registered: number;
}

const INITIAL_DRIVES: Drive[] = [
  { company: "TCS", date: "2026-03-15", eligibility: "CGPA ≥ 7.0", cgpa: "7.0", branches: ["CSE", "IT", "ECE"], rounds: "Aptitude → Technical → HR", pkg: "₹7 LPA", deadline: "2026-03-12", registered: 120 },
  { company: "Amazon", date: "2026-03-10", eligibility: "CGPA ≥ 8.0", cgpa: "8.0", branches: ["CSE"], rounds: "Online → DSA → System Design → Bar Raiser", pkg: "₹32 LPA", deadline: "2026-03-08", registered: 65 },
  { company: "Infosys", date: "2026-03-18", eligibility: "CGPA ≥ 6.5", cgpa: "6.5", branches: ["CSE", "ECE", "EEE", "IT"], rounds: "Aptitude → Technical → HR", pkg: "₹6.5 LPA", deadline: "2026-03-15", registered: 145 },
];

const BRANCH_PLACEMENT = [
  { branch: "CSE", percent: 82 }, { branch: "ECE", percent: 58 },
  { branch: "EEE", percent: 45 }, { branch: "MECH", percent: 32 }, { branch: "IT", percent: 68 },
];

const PLACED_STUDENTS = [
  { name: "Divya Gupta", branch: "CSE", cgpa: 9.3, company: "Google", pkg: "₹42 LPA", date: "2026-01-15" },
  { name: "Arjun Sharma", branch: "CSE", cgpa: 8.4, company: "Amazon", pkg: "₹32 LPA", date: "2026-01-20" },
  { name: "Priya Verma", branch: "CSE", cgpa: 9.1, company: "Microsoft", pkg: "₹28 LPA", date: "2026-02-05" },
  { name: "Sneha Reddy", branch: "IT", cgpa: 8.0, company: "TCS", pkg: "₹7 LPA", date: "2026-02-10" },
  { name: "Ananya Patel", branch: "CSE", cgpa: 8.8, company: "Infosys", pkg: "₹6.5 LPA", date: "2026-02-12" },
  { name: "Meera Iyer", branch: "IT", cgpa: 8.6, company: "Wipro", pkg: "₹5.5 LPA", date: "2026-02-18" },
  { name: "Rahul Singh", branch: "ECE", cgpa: 7.6, company: "TCS", pkg: "₹7 LPA", date: "2026-02-20" },
  { name: "Aditya Kumar", branch: "ECE", cgpa: 7.4, company: "Cognizant", pkg: "₹5 LPA", date: "2026-03-01" },
  { name: "Vikram Joshi", branch: "EEE", cgpa: 7.2, company: "Accenture", pkg: "₹4.5 LPA", date: "2026-03-02" },
  { name: "Karthik Nair", branch: "MECH", cgpa: 7.8, company: "L&T", pkg: "₹6 LPA", date: "2026-03-05" },
];

const PlacementDashboard = () => {
  const [view, setView] = useState<ViewKey>("overview");
  const [drives, setDrives] = useState<Drive[]>(INITIAL_DRIVES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: "", date: "", cgpa: "", branches: [] as string[], rounds: "", pkg: "", deadline: "" });
  const [reportBranch, setReportBranch] = useState("all");

  const resetForm = () => setForm({ company: "", date: "", cgpa: "", branches: [], rounds: "", pkg: "", deadline: "" });

  const postDrive = () => {
    if (!form.company) return;
    setDrives([
      ...drives,
      { ...form, eligibility: `CGPA ≥ ${form.cgpa}`, registered: 0 },
    ]);
    setShowForm(false);
    resetForm();
  };

  const deleteDrive = (i: number) => setDrives(drives.filter((_, idx) => idx !== i));

  const toggleBranch = (b: string) => {
    setForm((f) => ({
      ...f,
      branches: f.branches.includes(b) ? f.branches.filter((x) => x !== b) : [...f.branches, b],
    }));
  };

  const exportCsv = () => {
    const rows = filteredPlaced.map((s) => `${s.name},${s.branch},${s.cgpa},${s.company},${s.pkg},${s.date}`);
    const csv = "Name,Branch,CGPA,Company,Package,Date\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "placement_report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const filteredPlaced = PLACED_STUDENTS.filter((s) => reportBranch === "all" || s.branch === reportBranch);

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <PlacementNav />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="flex gap-2 mb-6">
          {(["overview", "drives", "reports"] as ViewKey[]).map((v) => (
            <Button key={v} variant={view === v ? "default" : "ghost"} size="sm" onClick={() => setView(v)} className="capitalize">
              {v === "drives" ? "Drive Management" : v === "reports" ? "Reports" : "Overview"}
            </Button>
          ))}
        </div>

        {/* OVERVIEW */}
        {view === "overview" && (
          <>
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
            <Card className="mb-6">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-4">Month-wise Placement Count</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={MONTH_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 32% 91%)", borderRadius: 8, fontSize: 13 }} />
                    <Bar dataKey="count" fill="hsl(217 91% 60%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <h3 className="font-semibold text-foreground p-5 pb-3">Upcoming Company Drives</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      {["Company", "Date", "Eligibility", "Registered", "Status"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {UPCOMING_DRIVES.map((d, i) => (
                      <tr key={i} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                        <td className="px-4 py-3 font-medium text-foreground">{d.company}</td>
                        <td className="px-4 py-3 text-muted-foreground">{d.date}</td>
                        <td className="px-4 py-3 text-muted-foreground">{d.eligibility}</td>
                        <td className="px-4 py-3 text-foreground">{d.registered}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[d.status]}`}>{d.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}

        {/* DRIVE MANAGEMENT */}
        {view === "drives" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Drive Management</h2>
              <Button className="gap-1" onClick={() => setShowForm(true)}><Plus className="h-4 w-4" /> Add New Drive</Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {drives.map((d, i) => (
                <Card key={i}>
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground text-lg">{d.company}</h4>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteDrive(i)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Date: {d.date}</p>
                    <p className="text-sm text-muted-foreground">{d.eligibility} • {d.branches.join(", ")}</p>
                    <p className="text-sm text-muted-foreground">Package: {d.pkg}</p>
                    <div className="flex items-center justify-between pt-1">
                      <Badge variant="secondary">{d.registered} registered</Badge>
                      <span className="text-xs text-muted-foreground">Deadline: {d.deadline}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader><DialogTitle>Add New Drive</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Company Name</label>
                    <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Visit Date</label>
                      <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Min CGPA</label>
                      <Input value={form.cgpa} onChange={(e) => setForm({ ...form, cgpa: e.target.value })} placeholder="e.g. 7.0" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Eligible Branches</label>
                    <div className="flex flex-wrap gap-3">
                      {BRANCHES.map((b) => (
                        <label key={b} className="flex items-center gap-1.5 text-sm text-foreground">
                          <Checkbox checked={form.branches.includes(b)} onCheckedChange={() => toggleBranch(b)} />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Rounds Description</label>
                    <Input value={form.rounds} onChange={(e) => setForm({ ...form, rounds: e.target.value })} placeholder="e.g. Aptitude → Technical → HR" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Package</label>
                      <Input value={form.pkg} onChange={(e) => setForm({ ...form, pkg: e.target.value })} placeholder="e.g. ₹7 LPA" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Application Deadline</label>
                      <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                    </div>
                  </div>
                  <Button className="w-full" onClick={postDrive}>Post Drive</Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* REPORTS */}
        {view === "reports" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Placement Reports</h2>
              <Button variant="outline" className="gap-1" onClick={exportCsv}><Download className="h-4 w-4" /> Export CSV</Button>
            </div>
            <div className="flex gap-3 mb-6">
              <Select value={reportBranch} onValueChange={setReportBranch}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Branch" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {BRANCHES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-4">Branch-wise Placement %</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={BRANCH_PLACEMENT} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                    <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <YAxis dataKey="branch" type="category" tick={{ fontSize: 12 }} width={50} />
                    <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 32% 91%)", borderRadius: 8, fontSize: 13 }} />
                    <Bar dataKey="percent" fill="hsl(217 91% 60%)" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      {["Student Name", "Branch", "CGPA", "Company Placed", "Package", "Date"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlaced.map((s, i) => (
                      <tr key={i} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                        <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                        <td className="px-4 py-3"><Badge variant="secondary">{s.branch}</Badge></td>
                        <td className="px-4 py-3 text-foreground">{s.cgpa}</td>
                        <td className="px-4 py-3 text-foreground">{s.company}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{s.pkg}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default PlacementDashboard;
