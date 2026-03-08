import { motion } from "framer-motion";
import { 
  Brain, Code, ClipboardCheck, BookOpen, FileText, BarChart3, 
  ArrowRight, GraduationCap, LogOut, ChevronRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const features = [
  {
    icon: Brain,
    title: "Aptitude Practice",
    description: "Master quantitative, logical reasoning and verbal ability with curated question banks.",
  },
  {
    icon: Code,
    title: "Coding Challenges",
    description: "Solve DSA problems across difficulty levels with built-in code editor and test cases.",
  },
  {
    icon: ClipboardCheck,
    title: "Mock Tests",
    description: "Simulate real placement exams with timed tests and detailed performance analysis.",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    description: "Access comprehensive notes, video lectures and reference materials for every topic.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create ATS-friendly resumes with professional templates tailored for freshers.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your preparation journey with detailed analytics and performance insights.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-foreground">PlacePrep</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Ace Your Placement.{" "}
              <span className="text-primary">All in One Place.</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Centralized platform for aptitude, coding, mock tests, resume building and progress tracking.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-accent transition-colors">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Comprehensive tools designed to prepare you for every step of the placement process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5" />
            <span className="font-bold text-lg">PlacePrep</span>
          </div>
          <p className="text-background/60 text-sm">
            Department of Computer Science & Engineering
          </p>
          <p className="text-background/40 text-xs mt-2">
            Built with ❤️ by the Placement Training Team &bull; © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
