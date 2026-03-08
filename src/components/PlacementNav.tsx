import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Zap, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const LINKS = [
  { label: "Overview", to: "/placement" },
  { label: "Students", to: "/placement/students" },
  { label: "Drive Management", to: "/placement/drives" },
  { label: "Reports", to: "/placement/reports" },
  { label: "Notifications", to: "/placement/notifications" },
];

const PlacementNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold gradient-text tracking-tight">PlacePrep</span>
          <Badge className="bg-amber-500 text-white text-[10px] px-1.5 py-0 ml-1 border-0 hover:bg-amber-500">PLACEMENT CELL</Badge>
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/placement"}
              className={({ isActive }) =>
                `px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 relative ${
                  isActive ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`
              }
            >
              {({ isActive }) => (
                <>{link.label}{isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full gradient-bg" />}</>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="relative p-2 rounded-xl hover:bg-muted/60 transition-all duration-200">
            <Bell className="w-[18px] h-[18px] text-muted-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 gradient-bg text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted/60 transition-all duration-200">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">PC</div>
              <span className="text-sm font-medium text-foreground hidden sm:block">Officer</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl py-1.5 z-50">
                {[
                  { icon: User, label: "Profile", action: () => {} },
                  { icon: Settings, label: "Settings", action: () => {} },
                  { icon: LogOut, label: "Logout", action: () => { logout(); navigate("/login"); } },
                ].map((item) => (
                  <button key={item.label} onClick={() => { setDropdownOpen(false); item.action(); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted/60 transition-all duration-200">
                    <item.icon className="w-4 h-4 text-muted-foreground" />{item.label}
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

export default PlacementNav;
