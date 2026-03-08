import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle, Plus, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const COMPANIES = ["TCS", "Infosys", "Amazon", "Google", "Wipro", "Accenture", "Cognizant"];
const DEFAULT_SKILLS = ["Python", "DSA", "SQL", "Problem Solving"];

const RESULTS_DATA: Record<string, {
  matchPercent: number;
  have: string[];
  missing: { skill: string }[];
  path: { skill: string; time: string }[];
}> = {
  Amazon: {
    matchPercent: 72,
    have: ["Python", "DSA", "Problem Solving", "SQL"],
    missing: [
      { skill: "System Design" },
      { skill: "Low Level Design" },
      { skill: "Kubernetes" },
      { skill: "AWS Services" },
    ],
    path: [
      { skill: "System Design", time: "4 weeks" },
      { skill: "Low Level Design", time: "3 weeks" },
      { skill: "Kubernetes", time: "2 weeks" },
      { skill: "AWS Services", time: "2 weeks" },
    ],
  },
  Google: {
    matchPercent: 65,
    have: ["Python", "DSA", "Problem Solving"],
    missing: [
      { skill: "System Design" },
      { skill: "Competitive Programming" },
      { skill: "Machine Learning" },
    ],
    path: [
      { skill: "Competitive Programming", time: "5 weeks" },
      { skill: "System Design", time: "4 weeks" },
      { skill: "Machine Learning", time: "6 weeks" },
    ],
  },
};

// Fallback for companies not explicitly listed
const DEFAULT_RESULT = {
  matchPercent: 78,
  have: ["Python", "DSA", "SQL", "Problem Solving"],
  missing: [
    { skill: "System Design" },
    { skill: "Cloud Computing" },
  ],
  path: [
    { skill: "System Design", time: "4 weeks" },
    { skill: "Cloud Computing", time: "3 weeks" },
  ],
};

const SkillGap = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("Software Engineer");
  const [skills, setSkills] = useState<string[]>([...DEFAULT_SKILLS]);
  const [newSkill, setNewSkill] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const result = RESULTS_DATA[company] || DEFAULT_RESULT;

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setNewSkill("");
    }
  };

  const removeSkill = (s: string) => setSkills(skills.filter((sk) => sk !== s));

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-1">Skill Gap Analyzer</h1>
        <p className="text-muted-foreground mb-8">Find out what skills you need for your dream company.</p>

        {/* Input Card */}
        <Card className="max-w-[700px] mx-auto mb-10">
          <CardContent className="p-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Target Company</label>
              <Select value={company} onValueChange={(v) => { setCompany(v); setShowResults(false); }}>
                <SelectTrigger><SelectValue placeholder="Select a company" /></SelectTrigger>
                <SelectContent>
                  {COMPANIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Target Role</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Software Engineer" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">My Current Skills</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((s) => (
                  <Badge key={s} className="bg-primary text-primary-foreground gap-1 pr-1.5">
                    {s}
                    <button onClick={() => removeSkill(s)} className="ml-0.5 hover:opacity-70"><X className="h-3 w-3" /></button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill…"
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handleAnalyze}
              disabled={!company || analyzing}
            >
              {analyzing ? "Analyzing…" : "Analyze My Skill Gap"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Match Score Banner */}
            <div className="rounded-xl p-6 mb-8 text-center text-primary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 48%))" }}>
              <p className="text-lg opacity-90 mb-1">Your Match Score</p>
              <p className="text-4xl font-bold">{result.matchPercent}% Match with {company} {role} Role</p>
            </div>

            {/* Have / Missing */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 text-lg">Skills You Have ✓</h3>
                  <ul className="space-y-3">
                    {result.have.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-foreground">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 text-lg">Skills You're Missing ✗</h3>
                  <ul className="space-y-3">
                    {result.missing.map((m) => (
                      <li key={m.skill} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-foreground">
                          <XCircle className="h-5 w-5 text-destructive shrink-0" />
                          {m.skill}
                        </span>
                        <a href="/study-materials" className="text-sm text-primary hover:underline">View Materials</a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Learning Path */}
            <h3 className="font-semibold text-foreground text-lg mb-4">Recommended Learning Path</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {result.path.map((step, i) => (
                <motion.div
                  key={step.skill}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.4 }}
                >
                  <Card className="relative h-full">
                    <CardContent className="p-5 flex flex-col h-full">
                      <span className="text-xs font-bold text-primary mb-2">Step {i + 1}</span>
                      <h4 className="font-semibold text-foreground mb-1">{step.skill}</h4>
                      <p className="text-sm text-muted-foreground mb-4">Estimated: {step.time}</p>
                      <Button size="sm" className="mt-auto w-full gap-1">
                        Start Learning <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </CardContent>
                    {i < result.path.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SkillGap;
