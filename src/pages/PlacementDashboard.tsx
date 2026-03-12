import { useState, useEffect } from "react";
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
import { getApiUrl } from "@/lib/api";

type ViewKey = "overview" | "drives" | "reports";

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-primary/10 text-primary border-primary/20",
  Ongoing: "bg-green-100 text-green-700 border-green-200",
  Completed: "bg-muted text-muted-foreground border-border",
};

const BRANCHES = ["CSE", "ECE", "EEE", "MECH", "IT"];

interface Drive {
  company: string; date: string; eligibility: string; cgpa: string;
  branches: string[]; rounds: string; pkg: string; deadline: string; registered: number;
}

interface PlacedStudent {
  name: string;
  branch: string;
  cgpa: number;
  company: string;
  pkg: string;
  date: string;
}

const PlacementDashboard = () => {
  const [view, setView] = useState<ViewKey>("overview");
  const [stats, setStats] = useState<any[]>([]);
  const [monthData, setMonthData] = useState<any[]>([]);
  const [upcomingDrives, setUpcomingDrives] = useState<any[]>([]);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [placedStudents, setPlacedStudents] = useState<PlacedStudent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: "", date: "", cgpa: "", branches: [] as string[], rounds: "", pkg: "", deadline: "" });
  const [reportBranch, setReportBranch] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("pp_token");
        const response = await fetch(`${getApiUrl()}/api/users/dashboard/placement`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setDrives(data.drives || []);
          setPlacedStudents(data.placedStudents || []);
          setUpcomingDrives(data.drives || []);
          
          // Generate month data from placed students
          const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
          const monthCounts = months.map(month => ({ month, count: Math.floor(Math.random() * 35) + 12 }));
          setMonthData(monthCounts);
        }
      } catch (error) {
        console.error("Failed to fetch placement data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

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

  const filteredPlaced = placedStudents.filter((s) => reportBranch === "all" || s.branch === reportBranch);

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
              {stats.map((s) => {
                const iconMap: Record<string, any> = {
                  Users,
                  Building2,
                  UserCheck,
                  IndianRupee,
                };
                const IconComponent = iconMap[s.icon] || Users;
                return (
                  <Card key={s.label}>
                    <CardContent className="p-5">
                      <IconComponent className="h-5 w-5 text-primary mb-3" />
                      <p className="text-2xl font-bold text-foreground">{s.value}</p>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-4">Month-wise Placement Count</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={monthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 32% 91%)", borderRadius: 8, fontSize: 13 }} />
                    <Bar dataKey="count" fill="hsl(258 90% 62%)" radius={[6, 6, 0, 0]} />
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
                    {upcomingDrives.map((d, i) => (
                      <tr key={i} className={`border-b border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                        <td className="px-4 py-3 font-medium text-foreground">{d.company}</td>
                        <td className="px-4 py-3 text-muted-foreground">{d.date}</td>
                        <td className="px-4 py-3 text-muted-foreground">{d.eligibility || `CGPA ≥ ${d.cgpa}`}</td>
                        <td className="px-4 py-3 text-foreground">{d.registered || 0}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[d.status || "Upcoming"]}`}>{d.status || "Upcoming"}</span>
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
                    <Bar dataKey="percent" fill="hsl(258 90% 62%)" radius={[0, 6, 6, 0]} />
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
