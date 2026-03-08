import { useState } from "react";
import { toast } from "sonner";
import DashboardNav from "@/components/DashboardNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pencil, Plus, X, Save, Calendar, Phone, Mail, User,
  GraduationCap, BookOpen, Award, Flame, Target, Link2,
  Github, Linkedin, Globe, Code2,
} from "lucide-react";

const INITIAL_PROFILE = {
  name: "Arjun Sharma",
  rollNo: "21CS3045",
  branch: "Computer Science & Engineering",
  college: "VIT Vellore",
  cgpa: 8.4,
  email: "arjun.sharma@vit.ac.in",
  phone: "+91 98765 43210",
  dob: "2002-05-15",
  degree: "B.Tech",
  gradYear: "2025",
  backlogs: "0",
  linkedin: "https://linkedin.com/in/arjunsharma",
  github: "https://github.com/arjunsharma",
  leetcode: "https://leetcode.com/arjunsharma",
  portfolio: "",
};

const INITIAL_SKILLS: { name: string; level: "Beginner" | "Intermediate" | "Expert" }[] = [
  { name: "Python", level: "Expert" },
  { name: "DSA", level: "Intermediate" },
  { name: "SQL", level: "Intermediate" },
  { name: "React", level: "Beginner" },
  { name: "Java", level: "Intermediate" },
  { name: "Machine Learning", level: "Beginner" },
];

const STATS = [
  { label: "Tests Taken", value: "24", icon: BookOpen },
  { label: "Avg Score", value: "76%", icon: Award },
  { label: "Streak", value: "12 days", icon: Flame },
  { label: "Readiness", value: "68%", icon: Target },
];

const LEVELS: ("Beginner" | "Intermediate" | "Expert")[] = ["Beginner", "Intermediate", "Expert"];
const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-muted text-muted-foreground",
  Intermediate: "bg-accent text-accent-foreground",
  Expert: "bg-primary text-primary-foreground",
};

const StudentProfile = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState("");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState(INITIAL_PROFILE);

  const startEdit = (section: string) => {
    setEditDraft({ ...profile });
    setEditingSection(section);
  };
  const cancelEdit = () => setEditingSection(null);
  const saveEdit = () => {
    setProfile({ ...editDraft });
    setEditingSection(null);
    toast.success("Profile updated ✓");
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.find((sk) => sk.name === s)) {
      setSkills([...skills, { name: s, level: "Beginner" }]);
      setNewSkill("");
    }
  };
  const removeSkill = (name: string) => setSkills(skills.filter((s) => s.name !== name));
  const setLevel = (name: string, level: "Beginner" | "Intermediate" | "Expert") =>
    setSkills(skills.map((s) => (s.name === name ? { ...s, level } : s)));

  const initials = profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  const Field = ({
    label, value, icon: Icon, fieldKey,
  }: { label: string; value: string; icon: React.ElementType; fieldKey: keyof typeof editDraft }) => (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {editingSection ? (
          <Input
            value={editDraft[fieldKey]}
            onChange={(e) => setEditDraft({ ...editDraft, [fieldKey]: e.target.value })}
            className="mt-1 h-8 text-sm"
          />
        ) : (
          <p className="text-sm font-medium text-foreground truncate">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Avatar */}
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
                {initials}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {profile.rollNo} • {profile.branch} • {profile.college}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-primary text-primary-foreground">CGPA: {profile.cgpa}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-green-500 inline-block" /> Active
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 gap-1" onClick={() => startEdit("personal")}>
                    <Pencil className="h-3.5 w-3.5" /> Edit Profile
                  </Button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {STATS.map((s) => (
                    <div key={s.label} className="rounded-lg bg-muted/50 p-3 text-center">
                      <s.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                      <p className="text-lg font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="skills">My Skills</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="personal">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                  {!editingSection && (
                    <Button variant="ghost" size="sm" onClick={() => startEdit("personal")}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6">
                  <Field label="Full Name" value={profile.name} icon={User} fieldKey="name" />
                  <Field label="Email" value={profile.email} icon={Mail} fieldKey="email" />
                  <Field label="Phone" value={profile.phone} icon={Phone} fieldKey="phone" />
                  <Field label="Date of Birth" value={profile.dob} icon={Calendar} fieldKey="dob" />
                </div>
                {editingSection && (
                  <div className="flex gap-2 mt-5">
                    <Button onClick={saveEdit} className="gap-1"><Save className="h-4 w-4" /> Save Changes</Button>
                    <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Info */}
          <TabsContent value="academic">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Academic Information</h2>
                  {!editingSection && (
                    <Button variant="ghost" size="sm" onClick={() => startEdit("academic")}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6">
                  <Field label="College Name" value={profile.college} icon={GraduationCap} fieldKey="college" />
                  <Field label="Degree" value={profile.degree} icon={BookOpen} fieldKey="degree" />
                  <Field label="Branch" value={profile.branch} icon={BookOpen} fieldKey="branch" />
                  <Field label="CGPA" value={String(profile.cgpa)} icon={Award} fieldKey="cgpa" />
                  <Field label="Graduation Year" value={profile.gradYear} icon={Calendar} fieldKey="gradYear" />
                  <Field label="Active Backlogs" value={profile.backlogs} icon={BookOpen} fieldKey="backlogs" />
                </div>
                {editingSection && (
                  <div className="flex gap-2 mt-5">
                    <Button onClick={saveEdit} className="gap-1"><Save className="h-4 w-4" /> Save Changes</Button>
                    <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Skills */}
          <TabsContent value="skills">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">My Skills</h2>
                <div className="space-y-3 mb-5">
                  {skills.map((s) => (
                    <div key={s.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <Badge className="bg-primary text-primary-foreground gap-1 pr-1.5">
                        {s.name}
                        <button onClick={() => removeSkill(s.name)} className="ml-0.5 hover:opacity-70"><X className="h-3 w-3" /></button>
                      </Badge>
                      <div className="flex gap-1 ml-auto">
                        {LEVELS.map((l) => (
                          <button
                            key={l}
                            onClick={() => setLevel(s.name, l)}
                            className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                              s.level === l ? LEVEL_COLORS[l] : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links */}
          <TabsContent value="social">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Social Links</h2>
                <div className="space-y-4">
                  {([
                    { label: "LinkedIn", key: "linkedin" as const, icon: Linkedin },
                    { label: "GitHub", key: "github" as const, icon: Github },
                    { label: "LeetCode", key: "leetcode" as const, icon: Code2 },
                    { label: "Portfolio", key: "portfolio" as const, icon: Globe },
                  ]).map(({ label, key, icon: Icon }) => (
                    <div key={key}>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                        <Input
                          value={profile[key]}
                          onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                          placeholder={`Enter ${label} URL`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-5 gap-1" onClick={() => toast.success("Profile updated ✓")}><Link2 className="h-4 w-4" /> Save Links</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;
