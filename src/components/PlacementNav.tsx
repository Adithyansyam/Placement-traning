import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Zap, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LINKS = [
  { label: "Overview", to: "/placement" },
  { label: "Students", to: "/placement/students" },
  { label: "Drive Management", to: "/placement/drives" },
  { label: "Reports", to: "/placement/reports" },
  { label: "Notifications", to: "/placement/notifications" },
];

const PlacementNav = () => {
  const navigate = useNavigate();
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2 shrink-0">
          <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
          <span className="text-base font-bold text-primary tracking-tight">PlacePrep</span>
          <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0 ml-1 hover:bg-orange-500">PLACEMENT CELL</Badge>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/placement"}
              className={({ isActive }) =>
                `px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors relative ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`
              }
            >
              {({ isActive }) => (
                <>{link.label}{isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />}</>
              )}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-[18px] h-[18px] text-muted-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">PC</div>
              <span className="text-sm font-medium text-foreground hidden sm:block">Officer</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                {[
                  { icon: User, label: "Profile", action: () => {} },
                  { icon: Settings, label: "Settings", action: () => {} },
                  { icon: LogOut, label: "Logout", action: () => navigate("/login") },
                ].map((item) => (
                  <button key={item.label} onClick={() => { setDropdownOpen(false); item.action(); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
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
