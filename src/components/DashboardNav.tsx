import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Laptop, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Study Materials", to: "/study-materials" },
  { label: "Mock Tests", to: "/mock-tests" },
  { label: "Coding", to: "/coding" },
  { label: "Company Prep", to: "/company-prep" },
  { label: "Progress", to: "/progress" },
  { label: "Skill Gap", to: "/skill-gap" },
];

const DashboardNav = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate initials from user name
  const initials = user?.name ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "R";
  const displayName = user?.name ? user.name.split(" ")[0] : "Rahul";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
            <Laptop className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold gradient-text tracking-tight">PlacePrep</span>
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 relative ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full gradient-bg" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted/60 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground font-bold text-xs">
                {initials}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">{displayName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl py-1.5 z-50">
                {[
                  { icon: User, label: "Profile", action: () => navigate("/profile") },
                  { icon: Settings, label: "Settings", action: () => {} },
                  { icon: LogOut, label: "Logout", action: () => { logout(); navigate("/login"); } },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { setDropdownOpen(false); item.action(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted/60 transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
