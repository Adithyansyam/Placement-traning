import { useState } from "react";
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

const AI_FEATURES = [
  {
    icon: Brain,
    title: "AI Interview Coach",
    desc: "Practice mock interviews with real-time AI feedback on your answers, tone, and confidence.",
    badge: "Popular",
    badgeColor: "bg-violet-500",
    gradient: "from-violet-500/20 to-purple-500/10",
    action: "Start Practice",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    desc: "Upload your resume and get instant AI-powered feedback tailored to your target companies.",
    badge: "New",
    badgeColor: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-teal-500/10",
    action: "Analyze Resume",
  },
  {
    icon: Zap,
    title: "Smart Study Planner",
    desc: "Let AI build a personalized day-by-day study schedule based on your skills and interview date.",
    badge: "Beta",
    badgeColor: "bg-amber-500",
    gradient: "from-amber-500/20 to-orange-500/10",
    action: "Generate Plan",
  },
  {
    icon: Star,
    title: "Answer Evaluator",
    desc: "Paste any interview answer and receive a detailed AI score with actionable suggestions.",
    badge: null,
    badgeColor: "",
    gradient: "from-blue-500/20 to-cyan-500/10",
    action: "Evaluate Answer",
  },
];

const QUICK_PROMPTS = [
  "How do I answer 'Tell me about yourself'?",
  "Explain system design in simple terms",
  "Mock DSA interview question",
  "Tips for Amazon Leadership Principles",
];

const SAMPLE_RESPONSES: Record<string, string> = {
  "How do I answer 'Tell me about yourself'?":
    "Start with a brief professional intro (your degree & college), mention 1-2 key technical skills or projects, then tie it to why you're excited about this company. Keep it under 90 seconds and end with a forward-looking statement.",
  "Explain system design in simple terms":
    "System design is about planning how to build large-scale software. You decide on components (servers, databases, caches), how they communicate, and how to handle millions of users. Key pillars: scalability, reliability, and maintainability.",
  "Mock DSA interview question":
    "Here's one: Given an array of integers, find the two numbers that add up to a target sum. Return their indices.\n\nHint: Use a hash map to store complements. Time: O(n), Space: O(n). Try coding it out!",
  "Tips for Amazon Leadership Principles":
    "Use the STAR method (Situation, Task, Action, Result). Amazon values ownership, customer obsession, and bias for action. Prepare 2-3 stories per principle. Quantify your results (e.g., 'reduced latency by 30%').",
};

const DEFAULT_RESPONSE =
  "Great question! I'm here to help you ace your placement journey. I can assist with interview prep, resume tips, DSA concepts, system design, HR questions, and more. Just ask!";

const AIPage = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = (text?: string) => {
    const msg = (text ?? message).trim();
    if (!msg) return;
    setChat((prev) => [...prev, { role: "user", text: msg }]);
    setMessage("");
    setLoading(true);
    setTimeout(() => {
      const reply = SAMPLE_RESPONSES[msg] ?? DEFAULT_RESPONSE;
      setChat((prev) => [...prev, { role: "ai", text: reply }]);
      setLoading(false);
    }, 900);
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
            Powered by AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Your Personal{" "}
            <span className="gradient-text">AI Placement</span> Assistant
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Supercharge your interview prep with AI-driven coaching, resume
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
                  <Button size="sm" variant="outline" className="w-full gap-1 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    {f.action} <ArrowRight className="w-3.5 h-3.5" />
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
              <h2 className="text-lg font-bold text-foreground">AI Chat Assistant</h2>
              <p className="text-xs text-muted-foreground">Ask anything about placements, interviews, or coding</p>
            </div>
            <Badge className="ml-auto bg-emerald-500/15 text-emerald-600 border-emerald-500/30">● Online</Badge>
          </div>

          <Card className="mb-3">
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-72 overflow-y-auto p-5 space-y-4 flex flex-col">
                {chat.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
                    <MessageSquare className="w-10 h-10 opacity-20" />
                    <p className="text-sm">Ask the AI anything about your placement journey!</p>
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
              </div>

              {/* Input */}
              <div className="border-t border-border/50 p-4 flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask the AI assistant…"
                  className="flex-1"
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
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 text-muted-foreground transition-all duration-200"
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
