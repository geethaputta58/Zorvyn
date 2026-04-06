import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowLeftRight, Users, LogOut, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "analyst", "viewer"] as const },
    { to: "/transactions", label: "Transactions", icon: ArrowLeftRight, roles: ["admin", "analyst", "viewer"] as const },
    { to: "/users", label: "User Management", icon: Users, roles: ["admin"] as const },
  ];

  const filteredItems = navItems.filter((item) => role && (item.roles as readonly string[]).includes(role));

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar-background text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <DollarSign className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-bold">FinDash</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent">
            <span className="text-xs font-semibold">{user?.displayName?.[0]?.toUpperCase() || "U"}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user?.displayName || "User"}</p>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-sidebar-primary" />
              <span className="text-xs capitalize text-sidebar-foreground/60">{role}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
