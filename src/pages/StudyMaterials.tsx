import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, FileText, Video, ExternalLink, Heart, X,
  Calculator, Cpu, MessageSquare, Users, Building2, LayoutGrid
} from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";

type FileType = "PDF" | "Video" | "Link";
type Category = "Aptitude" | "Technical" | "Verbal" | "HR" | "Company-Wise";

interface Material {
  title: string;
  description: string;
  fileType: FileType;
  category: Category;
  tags: string[];
  url: string;
  embedId?: string;
}

const MATERIALS: Material[] = [
  { title: "Quantitative Aptitude Basics", description: "Master number systems, percentages, and time & work problems.", fileType: "Video", category: "Aptitude", tags: ["Aptitude", "Quant"], url: "https://www.youtube.com/watch?v=LjbLhMMrkNM", embedId: "LjbLhMMrkNM" },
  { title: "Logical Reasoning Patterns", description: "Common patterns in seating, blood relations, and puzzles.", fileType: "Video", category: "Aptitude", tags: ["Aptitude", "Logic"], url: "https://www.youtube.com/watch?v=tCYxc-2-3fY", embedId: "tCYxc-2-3fY" },
  { title: "Data Structures & Algorithms", description: "Arrays, trees, graphs, and sorting algorithms explained visually.", fileType: "Video", category: "Technical", tags: ["Technical", "DSA"], url: "https://www.youtube.com/watch?v=8hly31xKli0", embedId: "8hly31xKli0" },
  { title: "DBMS Complete Notes", description: "Normalization, ER diagrams, SQL queries, and transactions.", fileType: "PDF", category: "Technical", tags: ["Technical", "DBMS"], url: "https://www.tutorialspoint.com/dbms/dbms_tutorial.pdf" },
  { title: "TCS NQT Pattern Guide", description: "Detailed analysis of TCS NQT exam pattern and question types.", fileType: "Video", category: "Company-Wise", tags: ["TCS", "Pattern"], url: "https://www.youtube.com/watch?v=oBYJBFoBbKc", embedId: "oBYJBFoBbKc" },
  { title: "Infosys Previous Papers", description: "Last 5 years solved papers for Infosys campus recruitment.", fileType: "PDF", category: "Company-Wise", tags: ["Infosys", "Papers"], url: "https://www.geeksforgeeks.org/infosys-placement-papers/" },
  { title: "Verbal Ability Shortcuts", description: "Quick tricks for grammar, reading comprehension, and vocabulary.", fileType: "Video", category: "Verbal", tags: ["Verbal", "Shortcuts"], url: "https://www.youtube.com/watch?v=yXBRGM3GOQI", embedId: "yXBRGM3GOQI" },
  { title: "HR Interview Questions", description: "Top 50 most asked HR questions with ideal answer frameworks.", fileType: "Video", category: "HR", tags: ["HR", "Interview"], url: "https://www.youtube.com/watch?v=kayOhGRcNt4", embedId: "kayOhGRcNt4" },
  { title: "System Design Intro", description: "Fundamentals of scalable systems, load balancing, and caching.", fileType: "Video", category: "Technical", tags: ["Technical", "Design"], url: "https://www.youtube.com/watch?v=FSR1s2b-l_I", embedId: "FSR1s2b-l_I" },
];

const TABS: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Aptitude", value: "Aptitude" },
  { label: "Technical", value: "Technical" },
  { label: "Verbal", value: "Verbal" },
  { label: "HR", value: "HR" },
  { label: "Company-Wise", value: "Company-Wise" },
];

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  Aptitude: Calculator,
  Technical: Cpu,
  Verbal: MessageSquare,
  HR: Users,
  "Company-Wise": Building2,
};

const FILE_BADGE: Record<FileType, { className: string; icon: React.ElementType }> = {
  PDF: { className: "bg-primary/10 text-primary", icon: FileText },
  Video: { className: "bg-purple-100 text-purple-600", icon: Video },
  Link: { className: "bg-green-100 text-green-600", icon: ExternalLink },
};

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const toggleBookmark = (title: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const handleView = (material: Material) => {
    if (material.embedId) {
      setSelectedMaterial(material);
    } else {
      window.open(material.url, "_blank", "noopener,noreferrer");
    }
  };

  const filtered = MATERIALS.filter((m) => {
    const matchTab = activeTab === "All" || m.category === activeTab;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchTab && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl font-extrabold text-foreground">Study Materials</h1>
            <div className="relative w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search materials..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  activeTab === tab.value
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.span
                    layoutId="studyTab"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((material, i) => {
              const CatIcon = CATEGORY_ICONS[material.category] || LayoutGrid;
              const badge = FILE_BADGE[material.fileType];
              const BadgeIcon = badge.icon;

              return (
                <motion.div
                  key={material.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-[0_8px_30px_-8px_hsl(217_91%_60%/0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  style={{ borderRadius: 12 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <CatIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${badge.className}`}>
                      <BadgeIcon className="w-3 h-3" />
                      {material.fileType}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1">{material.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{material.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {material.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" className="text-xs font-semibold h-8 px-4 rounded-lg" onClick={() => handleView(material)}>
                      View
                    </Button>
                    <button
                      onClick={() => toggleBookmark(material.title)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          bookmarked.has(material.title)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No materials found</p>
              <p className="text-sm mt-1">Try a different search or filter</p>
            </div>
          )}
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedMaterial && selectedMaterial.embedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedMaterial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-base font-bold text-foreground truncate pr-4">{selectedMaterial.title}</h2>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMaterial.embedId}?autoplay=1`}
                  title={selectedMaterial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyMaterials;
