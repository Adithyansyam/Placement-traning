import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle2, ArrowRight } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

interface Company {
  name: string;
  abbr: string;
  color: string;
  materials: number;
  eligibility: string;
  branches: string;
  rounds: string[];
  package: string;
  papers: { title: string; year: string }[];
  tips: string[];
}

const COMPANIES: Company[] = [
  {
    name: "TCS", abbr: "TCS", color: "hsl(217 91% 55%)", materials: 8,
    eligibility: "60% throughout, no active backlogs",
    branches: "CSE, IT, ECE, EEE, MECH, CIVIL",
    rounds: ["TCS NQT (Online Test)", "Technical Interview", "Managerial Interview", "HR Interview"],
    package: "₹3.36 – ₹7 LPA",
    papers: [
      { title: "TCS NQT 2025 Solved Paper", year: "2025" },
      { title: "TCS NQT 2024 Question Set", year: "2024" },
      { title: "TCS Digital 2024 Paper", year: "2024" },
      { title: "TCS NQT 2023 Full Paper", year: "2023" },
    ],
    tips: [
      "Focus heavily on quantitative aptitude — TCS NQT has 60% aptitude questions.",
      "Practice coding in Java or Python — TCS prefers these languages.",
      "Revise DBMS and OS concepts for the technical round.",
      "Prepare 'Tell me about yourself' and project explanations for HR.",
      "Time management is key — NQT has strict time limits per section.",
    ],
  },
  {
    name: "Infosys", abbr: "INF", color: "hsl(200 80% 45%)", materials: 6,
    eligibility: "60% throughout, no active backlogs",
    branches: "CSE, IT, ECE, EEE",
    rounds: ["InfyTQ Online Test", "Technical Interview", "HR Interview"],
    package: "₹3.6 – ₹8 LPA",
    papers: [
      { title: "InfyTQ 2025 Paper", year: "2025" },
      { title: "Infosys SP 2024 Coding Set", year: "2024" },
      { title: "InfyTQ 2023 Aptitude Paper", year: "2023" },
    ],
    tips: [
      "InfyTQ certification gives a direct interview call — complete it early.",
      "Practice pseudo-code based questions — Infosys uses unique formats.",
      "Brush up on OOP concepts and Java fundamentals.",
      "Logical reasoning is heavily weighted in the online test.",
      "Showcase teamwork and leadership in HR — Infosys values culture fit.",
    ],
  },
  {
    name: "Wipro", abbr: "WIP", color: "hsl(270 60% 50%)", materials: 5,
    eligibility: "60% throughout, no backlogs",
    branches: "CSE, IT, ECE, EEE, MECH",
    rounds: ["Online Assessment", "Technical Interview", "HR Interview"],
    package: "₹3.5 – ₹6.5 LPA",
    papers: [
      { title: "Wipro NLTH 2025 Paper", year: "2025" },
      { title: "Wipro Elite 2024 Paper", year: "2024" },
      { title: "Wipro Turbo 2024 Coding", year: "2024" },
    ],
    tips: [
      "Wipro NLTH has essay writing — practice writing 200-word essays.",
      "Focus on verbal ability and reading comprehension.",
      "Coding questions are moderate — practice basic array and string problems.",
      "Be prepared for situational questions in the HR round.",
      "Wipro Turbo requires stronger coding skills — practice on HackerRank.",
    ],
  },
  {
    name: "Accenture", abbr: "ACC", color: "hsl(280 70% 50%)", materials: 5,
    eligibility: "60% throughout, no backlogs",
    branches: "All engineering branches",
    rounds: ["Cognitive Assessment", "Coding Round", "Communication Test", "HR Interview"],
    package: "₹4.5 – ₹7.5 LPA",
    papers: [
      { title: "Accenture 2025 Assessment", year: "2025" },
      { title: "Accenture 2024 Coding Paper", year: "2024" },
      { title: "Accenture 2023 Full Paper", year: "2023" },
    ],
    tips: [
      "Accenture focuses on cognitive ability — practice pattern recognition.",
      "Communication assessment is unique — practice clear articulation.",
      "Coding round is beginner-friendly — focus on basic logic and loops.",
      "Abstract reasoning questions are common — practice visual puzzles.",
      "Research Accenture's latest projects to discuss in the HR round.",
    ],
  },
  {
    name: "Cognizant", abbr: "CTS", color: "hsl(210 70% 45%)", materials: 4,
    eligibility: "60% throughout, no active backlogs",
    branches: "CSE, IT, ECE",
    rounds: ["GenC Online Test", "Technical Interview", "HR Interview"],
    package: "₹4 – ₹9 LPA",
    papers: [
      { title: "CTS GenC 2025 Paper", year: "2025" },
      { title: "CTS GenC Next 2024", year: "2024" },
      { title: "CTS 2023 Aptitude Set", year: "2023" },
    ],
    tips: [
      "GenC Next and GenC Elevate have different difficulty levels — know which you're targeting.",
      "Automata coding platform is used — practice on similar environments.",
      "Focus on data interpretation and analytical reasoning.",
      "SDLC and Agile methodology questions appear in technical rounds.",
      "Cognizant values problem-solving over rote learning — show your approach.",
    ],
  },
  {
    name: "HCL", abbr: "HCL", color: "hsl(200 60% 40%)", materials: 4,
    eligibility: "60% throughout",
    branches: "CSE, IT, ECE, EEE, MECH",
    rounds: ["Online Test", "Technical Interview", "HR Interview"],
    package: "₹3.5 – ₹6 LPA",
    papers: [
      { title: "HCL Tech 2025 Paper", year: "2025" },
      { title: "HCL 2024 Aptitude Set", year: "2024" },
      { title: "HCL 2023 Full Paper", year: "2023" },
    ],
    tips: [
      "HCL focuses on verbal and quantitative aptitude equally.",
      "Practice C/C++ basics — HCL often asks language fundamentals.",
      "Networking and OS concepts are frequently asked in technical rounds.",
      "Be prepared for role-play scenarios in HR interviews.",
      "HCL values adaptability — highlight diverse project experience.",
    ],
  },
  {
    name: "Amazon", abbr: "AMZ", color: "hsl(30 90% 50%)", materials: 7,
    eligibility: "7.0+ CGPA, no backlogs",
    branches: "CSE, IT",
    rounds: ["Online Assessment (2 coding)", "Technical Interview 1", "Technical Interview 2", "Bar Raiser Interview"],
    package: "₹26 – ₹44 LPA",
    papers: [
      { title: "Amazon OA 2025 Coding", year: "2025" },
      { title: "Amazon SDE 2024 Set", year: "2024" },
      { title: "Amazon LP Questions 2024", year: "2024" },
      { title: "Amazon OA 2023 Paper", year: "2023" },
    ],
    tips: [
      "Master Amazon's 16 Leadership Principles — every interview question maps to them.",
      "Online Assessment has 2 medium-hard coding problems — practice on LeetCode.",
      "System design basics are expected even for SDE-1 roles.",
      "Use the STAR method for behavioral questions.",
      "Focus on arrays, trees, graphs, and dynamic programming.",
    ],
  },
  {
    name: "Google", abbr: "GOG", color: "hsl(140 60% 45%)", materials: 6,
    eligibility: "No strict CGPA cutoff, strong coding skills required",
    branches: "CSE, IT",
    rounds: ["Online Coding Round", "Phone Screen", "Onsite (4-5 rounds)", "Hiring Committee Review"],
    package: "₹30 – ₹50+ LPA",
    papers: [
      { title: "Google Coding 2025 Set", year: "2025" },
      { title: "Google Interview 2024", year: "2024" },
      { title: "Google Kickstart Problems", year: "2024" },
    ],
    tips: [
      "Google expects optimal solutions — always discuss time and space complexity.",
      "Practice competitive programming on Codeforces and LeetCode hard problems.",
      "System design knowledge is crucial — study 'Designing Data-Intensive Applications'.",
      "Googliness interview assesses culture fit — be collaborative in problem solving.",
      "Think out loud during interviews — Google values your thought process over the final answer.",
    ],
  },
];

const DETAIL_TABS = ["About the Drive", "Previous Papers", "Preparation Tips"] as const;

const CompanyPrep = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<typeof DETAIL_TABS[number]>("About the Drive");

  const company = COMPANIES.find((c) => c.name === selected);

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Company-wise Preparation</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Select a company to access tailored prep materials, previous papers, and placement patterns.
            </p>
          </div>

          {/* Company Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMPANIES.map((c) => (
              <motion.button
                key={c.name}
                onClick={() => { setSelected(c.name); setDetailTab("About the Drive"); }}
                whileTap={{ scale: 0.97 }}
                className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  selected === c.name
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                }`}
                style={{ borderRadius: 12 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-extrabold mb-3 ${
                    selected === c.name ? "bg-white/20 text-primary-foreground" : ""
                  }`}
                  style={selected !== c.name ? { backgroundColor: c.color + "18", color: c.color } : {}}
                >
                  {c.abbr}
                </div>
                <div className={`font-bold text-sm ${selected === c.name ? "" : "text-foreground"}`}>
                  {c.name}
                </div>
                <div className={`text-xs mt-0.5 ${selected === c.name ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  Materials Available: {c.materials}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Company Details */}
          <AnimatePresence mode="wait">
            {company && (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                style={{ borderRadius: 12 }}
              >
                {/* Company header */}
                <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-extrabold"
                    style={{ backgroundColor: company.color + "18", color: company.color }}
                  >
                    {company.abbr}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-extrabold text-foreground">{company.name}</h2>
                      <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 px-6 border-b border-border">
                  {DETAIL_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                        detailTab === tab ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                      {detailTab === tab && (
                        <motion.span layoutId="companyTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {detailTab === "About the Drive" && (
                      <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-accent/50 border border-border" style={{ borderRadius: 12 }}>
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Eligibility</div>
                            <div className="text-sm font-semibold text-foreground">{company.eligibility}</div>
                            <div className="text-xs text-muted-foreground mt-1">Branches: {company.branches}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-accent/50 border border-border" style={{ borderRadius: 12 }}>
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Average Package</div>
                            <div className="text-xl font-extrabold text-primary">{company.package}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground mb-3">Selection Rounds</div>
                          <div className="flex flex-wrap items-center gap-2">
                            {company.rounds.map((round, i) => (
                              <div key={round} className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 text-xs font-semibold text-foreground">
                                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                    {i + 1}
                                  </span>
                                  {round}
                                </span>
                                {i < company.rounds.length - 1 && (
                                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {detailTab === "Previous Papers" && (
                      <motion.div key="papers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-4">
                        {company.papers.map((paper) => (
                          <div
                            key={paper.title}
                            className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:shadow-md hover:-translate-y-0.5 transition-all"
                            style={{ borderRadius: 12 }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-foreground truncate">{paper.title}</div>
                                <div className="text-xs text-muted-foreground">{paper.year} • PDF</div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="shrink-0 text-xs h-8 px-3 rounded-lg gap-1">
                              <Download className="w-3 h-3" /> Download
                            </Button>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {detailTab === "Preparation Tips" && (
                      <motion.div key="tips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                        {company.tips.map((tip, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div>
                              <span className="text-sm font-bold text-foreground">Tip {i + 1}: </span>
                              <span className="text-sm text-muted-foreground">{tip}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CompanyPrep;
