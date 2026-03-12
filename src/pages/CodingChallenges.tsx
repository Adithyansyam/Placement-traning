import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Play, Send } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

type Difficulty = "Easy" | "Medium" | "Hard";
type Topic = "Array" | "String" | "DP" | "Graph" | "Tree" | "Math" | "Stack";

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  topic: Topic;
  solved: boolean;
  description: string;
  example: { input: string; output: string; explanation: string };
  constraints: string[];
}

const PROBLEMS: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Array", solved: true,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    example: { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."] },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", solved: true,
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type and in the correct order.",
    example: { input: 's = "([])"', output: "true", explanation: "Every open bracket has a corresponding close bracket of the same type in correct order." },
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"  ] },
  { id: 3, title: "Reverse String", difficulty: "Easy", topic: "String", solved: false,
    description: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    example: { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: "The array is reversed in-place." },
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character."] },
  { id: 4, title: "Maximum Subarray", difficulty: "Medium", topic: "Array", solved: false,
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    example: { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"] },
  { id: 5, title: "Longest Common Subsequence", difficulty: "Medium", topic: "DP", solved: false,
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order.",
    example: { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: 'The longest common subsequence is "ace" and its length is 3.' },
    constraints: ["1 ≤ text1.length, text2.length ≤ 1000", "Strings consist of lowercase English letters."] },
  { id: 6, title: "Binary Tree Inorder Traversal", difficulty: "Easy", topic: "Tree", solved: true,
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values. Inorder traversal visits left subtree, root, then right subtree.",
    example: { input: "root = [1,null,2,3]", output: "[1,3,2]", explanation: "Inorder: left → root → right gives [1, 3, 2]." },
    constraints: ["The number of nodes is in range [0, 100]", "-100 ≤ Node.val ≤ 100"] },
  { id: 7, title: "Number of Islands", difficulty: "Medium", topic: "Graph", solved: false,
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    example: { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: "2", explanation: "There are two distinct islands in the grid." },
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300"] },
  { id: 8, title: "Climbing Stairs", difficulty: "Easy", topic: "DP", solved: false,
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    example: { input: "n = 3", output: "3", explanation: "Three ways: 1+1+1, 1+2, 2+1." },
    constraints: ["1 ≤ n ≤ 45"] },
  { id: 9, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Tree", solved: true,
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    example: { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "Both lists are merged while maintaining sorted order." },
    constraints: ["0 ≤ list length ≤ 50", "-100 ≤ Node.val ≤ 100", "Both lists are sorted in non-decreasing order."] },
  { id: 10, title: "Edit Distance", difficulty: "Hard", topic: "DP", solved: false,
    description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations: insert, delete, or replace a character.",
    example: { input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: 'horse → rorse → rose → ros (3 operations).' },
    constraints: ["0 ≤ word1.length, word2.length ≤ 500", "Strings consist of lowercase English letters."] },
];

const LANGUAGES = ["C++", "Java", "Python", "JavaScript"] as const;

const DIFF_STYLE: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const STARTER_CODE: Record<typeof LANGUAGES[number], string> = {
  "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    // Write your solution here\n    \n};\n\nint main() {\n    Solution sol;\n    // Test your code\n    return 0;\n}`,
  Java: `import java.util.*;\n\nclass Solution {\n    // Write your solution here\n    \n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        // Test your code\n    }\n}`,
  Python: `class Solution:\n    def solve(self):\n        # Write your solution here\n        pass\n\nif __name__ == "__main__":\n    sol = Solution()\n    # Test your code`,
  JavaScript: `class Solution {\n    // Write your solution here\n    \n}\n\nconst sol = new Solution();\n// Test your code`,
};

const CodingChallenges = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [diffFilter, setDiffFilter] = useState<Difficulty | "All">("All");
  const [topicFilter, setTopicFilter] = useState<Topic | "All">("All");
  const [language, setLanguage] = useState<typeof LANGUAGES[number]>("Python");
  const [code, setCode] = useState(STARTER_CODE["Python"]);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const filtered = PROBLEMS.filter((p) => {
    return (diffFilter === "All" || p.difficulty === diffFilter) &&
           (topicFilter === "All" || p.topic === topicFilter);
  });

  const selected = PROBLEMS.find((p) => p.id === selectedId) || PROBLEMS[0];

  const handleLanguageChange = (lang: typeof LANGUAGES[number]) => {
    setLanguage(lang);
    setCode(STARTER_CODE[lang]);
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 1000));
    setOutput("✓ Compiled successfully.\n\nTest Case 1: Passed\nTest Case 2: Passed\n\nAll test cases passed!");
    setRunning(false);
  };

  const lines = code.split("\n");

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <main className="pt-14 h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT PANEL */}
          <div className="w-[40%] border-r border-border bg-card flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border space-y-3">
              <h1 className="text-lg font-extrabold text-foreground">Coding Challenges</h1>
              <div className="flex gap-2">
                <select
                  value={diffFilter}
                  onChange={(e) => setDiffFilter(e.target.value as Difficulty | "All")}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value as Topic | "All")}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="All">All Topics</option>
                  <option value="Array">Array</option>
                  <option value="String">String</option>
                  <option value="DP">DP</option>
                  <option value="Graph">Graph</option>
                  <option value="Tree">Tree</option>
                  <option value="Stack">Stack</option>
                  <option value="Math">Math</option>
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-left border-b border-border transition-colors ${
                    selectedId === p.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/50"
                  }`}
                >
                  {p.solved ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="text-xs text-muted-foreground font-mono w-5 shrink-0">{p.id}.</span>
                  <span className={`text-sm font-semibold flex-1 truncate ${selectedId === p.id ? "text-primary" : "text-foreground"}`}>
                    {p.title}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${DIFF_STYLE[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                  <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full shrink-0">
                    {p.topic}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground">No problems match filters</div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[60%] flex flex-col overflow-hidden">
            {/* Problem description */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-extrabold text-foreground">{selected.id}. {selected.title}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DIFF_STYLE[selected.difficulty]}`}>
                  {selected.difficulty}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>

              {/* Example */}
              <div className="rounded-xl overflow-hidden" style={{ borderRadius: 12 }}>
                <div className="text-xs font-bold text-muted-foreground px-4 py-2 bg-muted">Example</div>
                <div className="p-4 font-mono text-xs leading-6" style={{ backgroundColor: "hsl(222 47% 11%)", color: "hsl(210 40% 90%)" }}>
                  <div><span className="text-primary">Input:</span> {selected.example.input}</div>
                  <div><span className="text-primary">Output:</span> {selected.example.output}</div>
                  <div className="mt-1 text-white/50"><span className="text-primary">Explanation:</span> {selected.example.explanation}</div>
                </div>
              </div>

              {/* Constraints */}
              <div>
                <div className="text-xs font-bold text-foreground mb-1.5">Constraints</div>
                <ul className="space-y-0.5">
                  {selected.constraints.map((c, i) => (
                    <li key={i} className="text-xs text-muted-foreground font-mono">• {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code editor section */}
            <div className="flex flex-col" style={{ minHeight: 320 }}>
              {/* Language tabs */}
              <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-card">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      language === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Editor */}
              <div className="flex-1 flex overflow-hidden" style={{ minHeight: 200 }}>
                {/* Line numbers */}
                <div className="py-3 px-3 text-right select-none" style={{ backgroundColor: "hsl(222 47% 9%)" }}>
                  {lines.map((_, i) => (
                    <div key={i} className="text-[11px] leading-5 font-mono" style={{ color: "hsl(215 16% 40%)" }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="flex-1 py-3 px-4 font-mono text-[12px] leading-5 resize-none focus:outline-none"
                  style={{
                    backgroundColor: "hsl(222 47% 11%)",
                    color: "hsl(210 40% 90%)",
                    caretColor: "hsl(217 91% 60%)",
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs font-semibold h-8 gap-1.5 rounded-lg" onClick={handleRun} disabled={running}>
                    <Play className="w-3.5 h-3.5" /> {running ? "Running..." : "Run Code"}
                  </Button>
                  <Button size="sm" className="text-xs font-semibold h-8 gap-1.5 rounded-lg shadow-sm shadow-primary/20" onClick={handleRun} disabled={running}>
                    <Send className="w-3.5 h-3.5" /> Submit
                  </Button>
                </div>
              </div>

              {/* Enhanced Output Section */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: output ? "auto" : 0, opacity: output ? 1 : 0 }}
                className="border-t-2 border-border bg-card/50 backdrop-blur-sm"
              >
                <div className="text-sm font-bold text-foreground px-4 py-3 bg-gradient-to-r from-primary/10 to-purple-500/10 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
                      <span>Console Output</span>
                    </div>
                    {output && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs px-2 py-1 h-6 hover:bg-muted/50"
                        onClick={() => setOutput("")}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  <pre
                    className="px-4 py-4 text-sm font-mono whitespace-pre-wrap leading-relaxed"
                    style={{ 
                      backgroundColor: "hsl(222 47% 11%)", 
                      color: "hsl(140 60% 55%)",
                      minHeight: "120px"
                    }}
                  >
                    {output || "// Click 'Run Code' to see output here..."}
                  </pre>
                </div>
                {output && output.includes("Passed") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-t border-green-500/20"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-700">All test cases passed! 🎉</span>
                    </div>
                  </motion.div>
                )}
                {output && output.includes("error") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 border-t border-red-500/20"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Circle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-red-700">Compilation Error</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodingChallenges;
