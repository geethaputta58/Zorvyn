import { createContext, useContext, useState, ReactNode } from "react";

type AppRole = "admin" | "analyst" | "viewer";

interface MockUser {
  id: string;
  email: string;
  displayName: string;
  role: AppRole;
}

interface AuthContextType {
  user: MockUser | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (role: AppRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: false,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

const MOCK_USERS: Record<AppRole, MockUser> = {
  viewer: { id: "mock-viewer", email: "viewer@findash.demo", displayName: "Demo Viewer", role: "viewer" },
  analyst: { id: "mock-analyst", email: "analyst@findash.demo", displayName: "Demo Analyst", role: "analyst" },
  admin: { id: "mock-admin", email: "admin@findash.demo", displayName: "Demo Admin", role: "admin" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);

  const signIn = (role: AppRole) => {
    setUser(MOCK_USERS[role]);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
