import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "admin" | "placement";

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user: { id: string; name: string; email: string } | null;
  login: (role: UserRole, userData?: { id?: string; name: string; email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  role: "student",
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("pp_auth") === "true");
  const [role, setRole] = useState<UserRole>(() => (localStorage.getItem("pp_role") as UserRole) || "student");
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(() => {
    const u = localStorage.getItem("pp_user");
    return u ? JSON.parse(u) : null;
  });

  const login = (r: UserRole, userData?: { id?: string; name: string; email: string }) => {
    const u = {
      id: userData?.id || `user_${Date.now()}`,
      name: userData?.name || (r === "admin" ? "Admin" : r === "placement" ? "Officer" : "Arjun Sharma"),
      email: userData?.email || "user@placeprep.com",
    };
    setIsAuthenticated(true);
    setRole(r);
    setUser(u);
    localStorage.setItem("pp_auth", "true");
    localStorage.setItem("pp_role", r);
    localStorage.setItem("pp_user", JSON.stringify(u));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("student");
    setUser(null);
    localStorage.removeItem("pp_auth");
    localStorage.removeItem("pp_role");
    localStorage.removeItem("pp_user");
    localStorage.removeItem("pp_userId");
    localStorage.removeItem("pp_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
