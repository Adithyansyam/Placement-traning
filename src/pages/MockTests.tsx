import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, CheckCircle2, XCircle, MinusCircle, ArrowLeft, ArrowRight, Flag, Send } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

type TestType = "Aptitude" | "Technical" | "Company-Wise" | "Full Mock";
type View = "listing" | "instructions" | "active" | "result";

interface Test {
  id: number; name: string; type: TestType; questions: number; duration: number; difficulty: string;
}

interface Question {
  id: number; text: string; options: string[]; correct: number; section: string;
}

const TESTS: Test[] = [
  { id: 1, name: "TCS NQT Mock Test", type: "Company-Wise", questions: 25, duration: 30, difficulty: "Medium" },
  { id: 2, name: "Aptitude Fundamentals", type: "Aptitude", questions: 20, duration: 25, difficulty: "Easy" },
  { id: 3, name: "DSA Concepts Quiz", type: "Technical", questions: 25, duration: 35, difficulty: "Hard" },
  { id: 4, name: "Full Placement Mock", type: "Full Mock", questions: 30, duration: 45, difficulty: "Medium" },
  { id: 5, name: "Infosys SP Mock", type: "Company-Wise", questions: 20, duration: 30, difficulty: "Medium" },
  { id: 6, name: "Verbal Ability Test", type: "Aptitude", questions: 15, duration: 20, difficulty: "Easy" },
];

const QUESTIONS: Question[] = [
  { id: 1, text: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, section: "Technical" },
  { id: 2, text: "A train 150m long passes a pole in 15 seconds. What is its speed?", options: ["36 km/h", "10 km/h", "54 km/h", "45 km/h"], correct: 0, section: "Aptitude" },
  { id: 3, text: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], correct: 1, section: "Technical" },
  { id: 4, text: "If 20% of a number is 80, what is the number?", options: ["400", "160", "320", "240"], correct: 0, section: "Aptitude" },
  { id: 5, text: "Which sorting algorithm has the best average case?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], correct: 2, section: "Technical" },
  { id: 6, text: "Find the missing number: 2, 6, 12, 20, ?", options: ["28", "30", "32", "36"], correct: 1, section: "Aptitude" },
  { id: 7, text: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], correct: 0, section: "Technical" },
  { id: 8, text: "A can do a work in 10 days, B in 15 days. Together they finish in?", options: ["5 days", "6 days", "8 days", "12 days"], correct: 1, section: "Aptitude" },
  { id: 9, text: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: 2, section: "Technical" },
  { id: 10, text: "The average of 5 consecutive numbers is 13. The largest is?", options: ["15", "14", "16", "13"], correct: 0, section: "Aptitude" },
  { id: 11, text: "Which OOP concept hides internal details?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], correct: 2, section: "Technical" },
  { id: 12, text: "If the ratio of A:B is 3:5 and B:C is 2:3, find A:C.", options: ["2:5", "6:15", "3:8", "1:3"], correct: 0, section: "Aptitude" },
  { id: 13, text: "What is the worst case of Quick Sort?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], correct: 1, section: "Technical" },
  { id: 14, text: "A clock shows 3:15. What is the angle between the hands?", options: ["0°", "7.5°", "15°", "22.5°"], correct: 1, section: "Aptitude" },
  { id: 15, text: "Which keyword is used for inheritance in Java?", options: ["implements", "extends", "inherits", "using"], correct: 1, section: "Technical" },
  { id: 16, text: "Simple interest on ₹5000 at 8% for 3 years?", options: ["₹1200", "₹1000", "₹800", "₹1500"], correct: 0, section: "Aptitude" },
  { id: 17, text: "What is a deadlock in OS?", options: ["Memory overflow", "Circular wait for resources", "CPU overload", "Disk failure"], correct: 1, section: "Technical" },
  { id: 18, text: "Profit % when CP=800 and SP=1000?", options: ["20%", "25%", "30%", "15%"], correct: 1, section: "Aptitude" },
  { id: 19, text: "TCP is a ___ protocol.", options: ["Connectionless", "Connection-oriented", "Stateless", "None"], correct: 1, section: "Technical" },
  { id: 20, text: "Two dice are thrown. Probability of sum = 7?", options: ["1/6", "5/36", "1/4", "7/36"], correct: 0, section: "Aptitude" },
  { id: 21, text: "Which normal form removes partial dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 1, section: "Technical" },
  { id: 22, text: "Speed of a boat in still water is 15 km/h, stream 3 km/h. Upstream speed?", options: ["12 km/h", "18 km/h", "10 km/h", "15 km/h"], correct: 0, section: "Aptitude" },
  { id: 23, text: "What is polymorphism?", options: ["One form", "Many forms", "No form", "Static form"], correct: 1, section: "Technical" },
  { id: 24, text: "LCM of 12 and 18?", options: ["36", "72", "6", "54"], correct: 0, section: "Aptitude" },
  { id: 25, text: "Which layer of OSI handles routing?", options: ["Transport", "Network", "Data Link", "Session"], correct: 1, section: "Technical" },
];

const TABS = ["All", "Aptitude", "Technical", "Company-Wise", "Full Mock"] as const;

const MockTests = () => {
  const [view, setView] = useState<View>("listing");
  const [tabFilter, setTabFilter] = useState<string>("All");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  // Active test state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalQ = selectedTest?.questions || 25;
  const questions = QUESTIONS.slice(0, totalQ);

  // Timer
  useEffect(() => {
    if (view !== "active" || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((p) => { if (p <= 1) { submitTest(); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, timeLeft]);

  const startTest = (test: Test) => {
    setSelectedTest(test);
    setView("instructions");
  };

  const beginTest = () => {
    setAnswers(Array(totalQ).fill(null));
    setMarked(new Set());
    setCurrentQ(0);
    setTimeLeft((selectedTest?.duration || 30) * 60);
    setView("active");
  };

  const submitTest = useCallback(() => {
    setShowConfirm(false);
    setView("result");
  }, []);

  const selectAnswer = (idx: number) => {
    setAnswers((prev) => { const n = [...prev]; n[currentQ] = idx; return n; });
  };

  const toggleMark = () => {
    setMarked((prev) => { const n = new Set(prev); n.has(currentQ) ? n.delete(currentQ) : n.add(currentQ); return n; });
  };

  const answered = answers.filter((a) => a !== null).length;
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  // Results
  const correct = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const wrong = answers.filter((a, i) => a !== null && a !== questions[i]?.correct).length;
  const skipped = answers.filter((a) => a === null).length;
  const pct = Math.round((correct / totalQ) * 100);

  const sectionScores = ["Aptitude", "Technical"].map((sec) => {
    const qs = questions.filter((q) => q.section === sec);
    const c = qs.reduce((acc, q) => acc + (answers[questions.indexOf(q)] === q.correct ? 1 : 0), 0);
    return { section: sec, score: Math.round((c / (qs.length || 1)) * 100) };
  });

  const filtered = TESTS.filter((t) => tabFilter === "All" || t.type === tabFilter);

  return (
    <div className="min-h-screen bg-accent/30">
      <DashboardNav />
      <main className="pt-14">
        <AnimatePresence mode="wait">
          {/* VIEW 1 — LISTING */}
          {view === "listing" && (
            <motion.div key="listing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-6 py-8 space-y-6">
              <h1 className="text-2xl font-extrabold text-foreground">Mock Tests</h1>
              <div className="flex gap-1 border-b border-border">
                {TABS.map((tab) => (
                  <button key={tab} onClick={() => setTabFilter(tab)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${tabFilter === tab ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}>
                    {tab}
                    {tabFilter === tab && <motion.span layoutId="mockTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((test) => (
                  <div key={test.id} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ borderRadius: 12 }}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-sm text-foreground">{test.name}</h3>
                      <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{test.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{test.questions} Questions • {test.duration} mins • {test.difficulty}</p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="text-xs font-semibold h-8 px-4 rounded-lg" onClick={() => startTest(test)}>Start Test</Button>
                      <button className="text-xs text-muted-foreground hover:text-foreground font-medium">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW 2 — INSTRUCTIONS */}
          {view === "instructions" && selectedTest && (
            <motion.div key="instructions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto px-6 py-12">
              <div className="bg-card rounded-xl border border-border p-8 shadow-sm" style={{ borderRadius: 12 }}>
                <h2 className="text-xl font-extrabold text-foreground mb-4">{selectedTest.name}</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-5">
                  <li>This test contains <span className="font-semibold text-foreground">{selectedTest.questions} questions</span>.</li>
                  <li>Total time: <span className="font-semibold text-foreground">{selectedTest.duration} minutes</span>.</li>
                  <li>Each correct answer carries 1 mark. No negative marking.</li>
                  <li>You can navigate between questions freely.</li>
                  <li>Mark questions for review if unsure.</li>
                  <li>Results will be shown immediately after submission.</li>
                </ol>
                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-yellow-800 font-medium">Once started, the timer cannot be paused. Make sure you have a stable connection.</p>
                </div>
                <div className="flex gap-3">
                  <Button className="font-semibold px-6" onClick={beginTest}>Begin Test</Button>
                  <Button variant="ghost" onClick={() => setView("listing")}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW 3 — ACTIVE TEST */}
          {view === "active" && (
            <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[calc(100vh-56px)] flex flex-col">
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
                <span className="font-bold text-sm text-foreground">{selectedTest?.name}</span>
                <span className="text-xs font-semibold bg-muted text-muted-foreground px-3 py-1 rounded-full">{answered}/{totalQ} Answered</span>
                <span className={`font-mono font-bold text-sm flex items-center gap-1.5 ${timeLeft < 60 ? "text-destructive" : "text-destructive"}`}>
                  <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Question area */}
                <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground font-semibold mb-2">Question {currentQ + 1} of {totalQ}</div>
                    <h3 className="text-base font-bold text-foreground mb-6">{questions[currentQ]?.text}</h3>
                    <div className="space-y-3">
                      {questions[currentQ]?.options.map((opt, i) => (
                        <button key={i} onClick={() => selectAnswer(i)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${
                            answers[currentQ] === i
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/30 text-foreground"
                          }`}>
                          <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
                    <Button variant="ghost" size="sm" disabled={currentQ === 0} onClick={() => setCurrentQ((p) => p - 1)} className="gap-1">
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={toggleMark}
                      className={`gap-1 ${marked.has(currentQ) ? "border-yellow-400 text-yellow-600 bg-yellow-50" : ""}`}>
                      <Flag className="w-3.5 h-3.5" /> {marked.has(currentQ) ? "Marked" : "Mark for Review"}
                    </Button>
                    <Button size="sm" disabled={currentQ === totalQ - 1} onClick={() => setCurrentQ((p) => p + 1)} className="gap-1">
                      Next <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Right sidebar — question grid */}
                <div className="w-56 border-l border-border bg-card p-4 flex flex-col">
                  <div className="text-xs font-bold text-foreground mb-3">Questions</div>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {Array.from({ length: totalQ }, (_, i) => {
                      const isAnswered = answers[i] !== null;
                      const isMarked = marked.has(i);
                      const isCurrent = currentQ === i;
                      return (
                        <button key={i} onClick={() => setCurrentQ(i)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            isCurrent ? "ring-2 ring-primary ring-offset-1" : ""
                          } ${isMarked ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                            : isAnswered ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground border border-border"}`}>
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="space-y-1.5 text-[10px] text-muted-foreground mb-4">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-primary" /> Answered</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-muted border border-border" /> Unanswered</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300" /> Marked</div>
                  </div>
                  <div className="mt-auto">
                    <Button className="w-full font-semibold gap-1.5" onClick={() => setShowConfirm(true)}>
                      <Send className="w-3.5 h-3.5" /> Submit Test
                    </Button>
                  </div>
                </div>
              </div>

              {/* Confirm Modal */}
              <AnimatePresence>
                {showConfirm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                      className="bg-card rounded-xl border border-border p-6 max-w-sm w-full shadow-xl" style={{ borderRadius: 12 }}>
                      <h3 className="font-extrabold text-foreground mb-2">Submit Test?</h3>
                      <p className="text-sm text-muted-foreground mb-1">{answered}/{totalQ} questions answered.</p>
                      {skipped > 0 && <p className="text-sm text-yellow-600 font-medium mb-4">{skipped} questions unanswered.</p>}
                      <div className="flex gap-3 mt-4">
                        <Button className="flex-1 font-semibold" onClick={submitTest}>Yes, Submit</Button>
                        <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>Go Back</Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* VIEW 4 — RESULT */}
          {view === "result" && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-6 py-8 space-y-6">
              <h1 className="text-2xl font-extrabold text-foreground">Test Results</h1>

              {/* Score circle + stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl border border-border p-6 flex items-center justify-center" style={{ borderRadius: 12 }}>
                  <div className="relative w-28 h-28">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-foreground">{pct}%</span>
                      <span className="text-[10px] text-muted-foreground">Score</span>
                    </div>
                  </div>
                </div>
                {[
                  { label: "Correct", value: correct, icon: CheckCircle2, color: "text-green-600" },
                  { label: "Wrong", value: wrong, icon: XCircle, color: "text-destructive" },
                  { label: "Skipped", value: skipped, icon: MinusCircle, color: "text-muted-foreground" },
                ].map((s) => (
                  <div key={s.label} className="bg-card rounded-xl border border-border p-5 flex items-center gap-3" style={{ borderRadius: 12 }}>
                    <s.icon className={`w-8 h-8 ${s.color}`} />
                    <div>
                      <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section chart */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm" style={{ borderRadius: 12 }}>
                <h2 className="text-base font-extrabold text-foreground mb-4">Section-wise Performance</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectionScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="section" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="score" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Question review */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden" style={{ borderRadius: 12 }}>
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-base font-extrabold text-foreground">Question Review</h2>
                </div>
                <div className="divide-y divide-border max-h-96 overflow-y-auto">
                  {questions.map((q, i) => {
                    const isCorrect = answers[i] === q.correct;
                    const wasAnswered = answers[i] !== null;
                    return (
                      <div key={q.id} className={`px-6 py-3 flex items-center gap-3 ${wasAnswered ? (isCorrect ? "bg-green-50" : "bg-red-50") : ""}`}>
                        {wasAnswered ? (
                          isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> : <XCircle className="w-4 h-4 text-destructive shrink-0" />
                        ) : (
                          <MinusCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}.</span>
                        <span className="text-sm text-foreground flex-1 truncate">{q.text}</span>
                        <span className="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{q.section}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button onClick={() => { setView("instructions"); }} className="font-semibold">Retake Test</Button>
                <Button variant="outline" onClick={() => { setView("listing"); setSelectedTest(null); }}>Back to Tests</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MockTests;
