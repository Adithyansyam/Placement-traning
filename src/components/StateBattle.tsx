import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList
} from "recharts";
import { Trophy, Wind, Share2, Leaf, Skull, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const INDIA_STATES_AQI = [
  { state: "Delhi", aqi: 289, region: "North" },
  { state: "Uttar Pradesh", aqi: 234, region: "North" },
  { state: "Bihar", aqi: 212, region: "East" },
  { state: "Haryana", aqi: 198, region: "North" },
  { state: "Rajasthan", aqi: 176, region: "North" },
  { state: "West Bengal", aqi: 167, region: "East" },
  { state: "Maharashtra", aqi: 156, region: "West" },
  { state: "Madhya Pradesh", aqi: 152, region: "Central" },
  { state: "Gujarat", aqi: 145, region: "West" },
  { state: "Punjab", aqi: 142, region: "North" },
  { state: "Jharkhand", aqi: 138, region: "East" },
  { state: "Tamil Nadu", aqi: 134, region: "South" },
  { state: "Chhattisgarh", aqi: 128, region: "Central" },
  { state: "Odisha", aqi: 121, region: "East" },
  { state: "Telangana", aqi: 112, region: "South" },
  { state: "Andhra Pradesh", aqi: 105, region: "South" },
  { state: "Karnataka", aqi: 98, region: "South" },
  { state: "Uttarakhand", aqi: 94, region: "North" },
  { state: "Assam", aqi: 87, region: "Northeast" },
  { state: "Goa", aqi: 78, region: "West" },
  { state: "Kerala", aqi: 67, region: "South" },
  { state: "Himachal Pradesh", aqi: 62, region: "North" },
  { state: "Manipur", aqi: 54, region: "Northeast" },
  { state: "Meghalaya", aqi: 48, region: "Northeast" },
  { state: "Tripura", aqi: 45, region: "Northeast" },
  { state: "Nagaland", aqi: 41, region: "Northeast" },
  { state: "Arunachal Pradesh", aqi: 38, region: "Northeast" },
  { state: "Sikkim", aqi: 31, region: "Northeast" },
  { state: "Mizoram", aqi: 23, region: "Northeast" },
];

const REGION_COLORS: Record<string, string> = {
  North: "hsl(0 70% 55%)",
  South: "hsl(35 90% 55%)",
  East: "hsl(0 60% 45%)",
  West: "hsl(25 80% 50%)",
  Central: "hsl(15 70% 50%)",
  Northeast: "hsl(140 60% 45%)",
};

const getAqiColor = (aqi: number) => {
  if (aqi > 200) return "hsl(0 70% 50%)";
  if (aqi > 150) return "hsl(25 80% 50%)";
  if (aqi > 100) return "hsl(35 90% 55%)";
  if (aqi > 50) return "hsl(50 90% 50%)";
  return "hsl(140 60% 45%)";
};

// Confetti particle component
const ConfettiParticle = ({ color, delay, x }: { color: string; delay: number; x: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color, left: `${x}%` }}
    initial={{ y: -10, opacity: 1, rotate: 0 }}
    animate={{ y: 300, opacity: 0, rotate: 720 }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 3, ease: "easeOut" }}
  />
);

const RegionBar = ({ label, avg, max }: { label: string; avg: number; max: number }) => {
  const pct = (avg / max) * 100;
  const color = avg > 180 ? "bg-red-500" : avg > 100 ? "bg-orange-400" : avg > 50 ? "bg-yellow-400" : "bg-green-500";
  const emoji = avg > 180 ? "🔴" : avg > 100 ? "🟠" : avg > 50 ? "🟡" : "🟢";
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-28 text-right font-medium text-foreground">{label}</span>
      <span>{emoji}</span>
      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
      <span className="w-12 font-bold text-foreground">{avg}</span>
    </div>
  );
};

const StateBattle = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [tick, setTick] = useState(0);

  // Simulate live updates every 15s
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 15000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    return INDIA_STATES_AQI
      .map((s) => ({
        ...s,
        aqi: Math.max(10, s.aqi + Math.floor((Math.random() - 0.5) * 20 * (tick > 0 ? 1 : 0))),
      }))
      .sort((a, b) => b.aqi - a.aqi);
  }, [tick]);

  const top3 = chartData.slice(0, 3);
  const cleanest3 = [...chartData].sort((a, b) => a.aqi - b.aqi).slice(0, 3);

  const regionAvgs = useMemo(() => {
    const groups: Record<string, number[]> = {};
    INDIA_STATES_AQI.forEach((s) => {
      if (!groups[s.region]) groups[s.region] = [];
      groups[s.region].push(s.aqi);
    });
    return Object.entries(groups)
      .map(([region, vals]) => ({
        region,
        avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
      }))
      .sort((a, b) => b.avg - a.avg);
  }, []);

  const maxRegionAvg = Math.max(...regionAvgs.map((r) => r.avg));
  const northAvg = regionAvgs.find((r) => r.region === "North")?.avg || 0;
  const southAvg = regionAvgs.find((r) => r.region === "South")?.avg || 0;

  const shameConfettiColors = ["hsl(0 70% 50%)", "hsl(0 50% 40%)", "hsl(15 60% 45%)", "hsl(0 80% 60%)"];
  const cleanConfettiColors = ["hsl(140 60% 45%)", "hsl(140 50% 55%)", "hsl(120 40% 50%)", "hsl(160 50% 45%)"];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-6 py-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <span className="font-bold text-foreground">PlacePrep</span>
        <div />
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* BATTLE ARENA HEADER */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            className="inline-block"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            ⚔️ STATE POLLUTION CHAMPIONSHIP
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            28 states. 1 shameful winner.
          </p>
        </motion.div>

        {/* PODIUM OF SHAME */}
        <Card className="relative overflow-hidden border-destructive/30 bg-gradient-to-br from-red-50 to-background dark:from-red-950/20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shameConfettiColors.flatMap((c, i) =>
              Array.from({ length: 5 }, (_, j) => (
                <ConfettiParticle key={`s-${i}-${j}`} color={c} delay={j * 0.4 + i * 0.2} x={Math.random() * 100} />
              ))
            )}
          </div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Skull className="w-6 h-6 text-destructive" /> PODIUM OF SHAME
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {top3.map((s, i) => (
                <motion.div
                  key={s.state}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2, type: "spring" }}
                  className={`text-center p-4 rounded-xl ${i === 0 ? "bg-red-100 dark:bg-red-900/30 ring-2 ring-destructive" : "bg-muted"}`}
                >
                  <div className="text-3xl">{["🥇", "🥈", "🥉"][i]}</div>
                  <div className="font-bold text-foreground text-lg mt-1">{s.state}</div>
                  <div className="text-2xl font-extrabold text-destructive">{s.aqi} AQI</div>
                  {i === 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-xs font-bold text-destructive mt-1 uppercase tracking-widest"
                    >
                      HALL OF SHAME
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ANIMATED RACE CHART */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Wind className="w-5 h-5" /> Live AQI Race
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="ml-2 text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full"
              >
                LIVE
              </motion.span>
            </CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(REGION_COLORS).map(([region, color]) => (
                <span key={region} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: color }} />
                  {region}
                </span>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ height: chartData.length * 28 + 40 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 100, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 320]} />
                  <YAxis
                    type="category"
                    dataKey="state"
                    width={95}
                    tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                    formatter={(value: number) => [`${value} AQI`, "Air Quality"]}
                  />
                  <Bar dataKey="aqi" radius={[0, 4, 4, 0]} animationDuration={800}>
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.state}
                        fill={REGION_COLORS[entry.region] || "hsl(var(--primary))"}
                        stroke={entry.state === selectedState ? "hsl(var(--foreground))" : "none"}
                        strokeWidth={entry.state === selectedState ? 2 : 0}
                      />
                    ))}
                    <LabelList dataKey="aqi" position="right" style={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Updates every 15 seconds • Click any state to highlight
            </p>
          </CardContent>
        </Card>

        {/* CLEANEST STATES CELEBRATION */}
        <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-green-50 to-background dark:from-green-950/20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {cleanConfettiColors.flatMap((c, i) =>
              Array.from({ length: 4 }, (_, j) => (
                <ConfettiParticle key={`c-${i}-${j}`} color={c} delay={j * 0.5 + i * 0.3} x={Math.random() * 100} />
              ))
            )}
          </div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 text-primary" /> CLEANEST STATES
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {cleanest3.map((s, i) => (
                <motion.div
                  key={s.state}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2, type: "spring" }}
                  className={`text-center p-4 rounded-xl ${i === 0 ? "bg-green-100 dark:bg-green-900/30 ring-2 ring-primary" : "bg-muted"}`}
                >
                  <div className="text-3xl">🌿</div>
                  <div className="font-bold text-foreground text-lg mt-1">{s.state}</div>
                  <div className="text-2xl font-extrabold text-primary">{s.aqi} AQI</div>
                  {i === 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-xs font-bold text-primary mt-1 uppercase tracking-widest"
                    >
                      BREATHING EASY
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm font-semibold text-primary mt-4">
              These states show it's POSSIBLE 💚
            </p>
          </CardContent>
        </Card>

        {/* NORTH vs SOUTH SHOWDOWN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground text-center">
              🏔️ REGION vs REGION SHOWDOWN
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regionAvgs.map((r) => (
              <RegionBar key={r.region} label={r.region} avg={r.avg} max={maxRegionAvg} />
            ))}
            <div className="mt-6 text-center space-y-3">
              <p className="text-base font-bold text-foreground">
                North India breathes{" "}
                <span className="text-destructive text-xl">{(northAvg / southAvg).toFixed(1)}x</span>{" "}
                more pollution than South
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "India State Pollution Battle",
                      text: `North India avg AQI: ${northAvg} vs South India avg AQI: ${southAvg}. North breathes ${(northAvg / southAvg).toFixed(1)}x more pollution!`,
                    });
                  } else {
                    navigator.clipboard.writeText(
                      `North India avg AQI: ${northAvg} vs South India avg AQI: ${southAvg}. North breathes ${(northAvg / southAvg).toFixed(1)}x more pollution!`
                    );
                  }
                }}
              >
                <Share2 className="w-4 h-4" /> Share this stat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StateBattle;
