import { useState, useRef, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  Brain,
  MessageSquare,
  FileText,
  Zap,
  SendHorizonal,
  ArrowRight,
  Star,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCTnJnlpyeRL5v1sILldEhrjcs3UjSUArE";

const SYSTEM_PROMPT = `You are PlacePrep AI, an expert placement and interview preparation assistant. 
Help students with:
- Technical interview preparation (DSA, System Design, LLD)
- HR and behavioral interview questions
- Resume tips and feedback
- Company-specific advice (Amazon, Google, TCS, Infosys, etc.)
- Coding challenges
- Study planning and roadmaps

Be concise, friendly, motivating, and practical. Format responses clearly using bullet points or numbered lists where helpful. Keep answers focused and actionable.`;

const AI_FEATURES = [
  {
    icon: Brain,
    title: "AI Interview Coach",
    desc: "Practice mock interviews with real-time AI feedback on your answers, tone, and confidence.",
    badge: "Popular",
    badgeColor: "bg-violet-500",
    gradient: "from-violet-500/20 to-purple-500/10",
    prompt: "Give me a mock technical interview question for a software engineer role at Amazon.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    desc: "Get AI-powered resume tips tailored to your target companies.",
    badge: "New",
    badgeColor: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-teal-500/10",
    prompt: "What are the top 5 things I should include in my resume to get shortlisted at top product companies?",
  },
  {
    icon: Zap,
    title: "Smart Study Planner",
    desc: "Let AI build a personalized day-by-day study schedule based on your skills and interview date.",
    badge: "Beta",
    badgeColor: "bg-amber-500",
    gradient: "from-amber-500/20 to-orange-500/10",
    prompt: "Create a 4-week placement preparation study plan for a student targeting Amazon/Google.",
  },
  {
    icon: Star,
    title: "Answer Evaluator",
    desc: "Get detailed AI feedback and scores on your interview answers.",
    badge: null,
    badgeColor: "",
    gradient: "from-blue-500/20 to-cyan-500/10",
    prompt: "How do I answer the question 'Tell me about yourself' in a placement interview? Give me a sample answer and tips.",
  },
];

const QUICK_PROMPTS = [
  "How do I answer 'Tell me about yourself'?",
  "Explain system design in simple terms",
  "Give me a DSA interview question",
  "Tips for Amazon Leadership Principles",
];

type Message = { role: "user" | "ai"; text: string };

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getModel = () =>
  genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

const AIPage = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // Maintain Gemini chat session
  const chatSessionRef = useRef<any>(null);
  const historyRef = useRef<{ role: string; parts: { text: string }[] }[]>([]);

  // Initialize chat session
  const initSession = () => {
    chatSessionRef.current = getModel().startChat({ history: historyRef.current });
  };

  useEffect(() => {
    initSession();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? message).trim();
    if (!msg || loading) return;
    setMessage("");
    setChat((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    // Ensure session is alive
    if (!chatSessionRef.current) initSession();

    try {
      const result = await chatSessionRef.current.sendMessage(msg);
      const reply = result.response.text();
      // Track history for session continuity
      historyRef.current = [
        ...historyRef.current,
        { role: "user", parts: [{ text: msg }] },
        { role: "model", parts: [{ text: reply }] },
      ];
      setChat((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err: any) {
      console.error("Gemini API error:", err);
      const errStr = String(err?.message ?? err ?? "");
      const is429 = err?.status === 429 || errStr.includes("429");
      const is403 = err?.status === 403 || errStr.includes("403") || errStr.includes("API_KEY");
      const errMsg = is429
        ? "⚠️ Rate limit reached — please wait 10–15 seconds and try again."
        : is403
        ? "❌ API key error — the Gemini key may be invalid or not enabled. Check the console for details."
        : `❌ Error: ${errStr || "Unknown error. Open browser console (F12) for details."}`;
      // Reinitialize session in case it got corrupted
      initSession();
      setChat((prev) => [...prev, { role: "ai", text: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <div className="max-w-6xl mx-auto px-4 py-10 pt-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Your Personal{" "}
            <span className="gradient-text">AI Placement</span> Assistant
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Supercharge your interview prep with Gemini-powered coaching, resume
            analysis, and smart study planning — all in one place.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {AI_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-5 flex flex-col h-full">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}
                  >
                    <f.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
                    {f.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${f.badgeColor}`}
                      >
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-5 flex-1 leading-relaxed">{f.desc}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-1 group-hover:border-primary/50 group-hover:text-primary transition-colors"
                    onClick={() => sendMessage(f.prompt)}
                    disabled={loading}
                  >
                    Try it <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Gemini AI Chat</h2>
              <p className="text-xs text-muted-foreground">Powered by Google Gemini · Ask anything about placements</p>
            </div>
            <Badge className="ml-auto bg-emerald-500/15 text-emerald-600 border-emerald-500/30">● Live</Badge>
          </div>

          <Card className="mb-3">
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-5 space-y-4 flex flex-col">
                {chat.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
                    <MessageSquare className="w-10 h-10 opacity-20" />
                    <p className="text-sm font-medium">Ask me anything about your placement journey!</p>
                    <p className="text-xs opacity-60">Interview tips, DSA, system design, HR questions…</p>
                  </div>
                )}
                <AnimatePresence>
                  {chat.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${c.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {c.role === "ai" && (
                        <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center mr-2 mt-0.5 shrink-0">
                          <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          c.role === "user"
                            ? "gradient-bg text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {c.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1 items-center">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border/50 p-4 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ask the AI assistant…"
                  className="flex-1"
                  disabled={loading}
                />
                <Button onClick={() => sendMessage()} disabled={!message.trim() || loading} className="gap-1.5 px-4">
                  <SendHorizonal className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground self-center mr-1">Quick ask:</span>
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 text-muted-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIPage;
