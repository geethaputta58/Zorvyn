import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Eye, BarChart3, ShieldCheck } from "lucide-react";

const roles = [
  {
    key: "viewer" as const,
    label: "Viewer",
    icon: Eye,
    description: "Can only view dashboard data and recent activity.",
    color: "border-blue-500/40 hover:border-blue-500 hover:bg-blue-500/5",
  },
  {
    key: "analyst" as const,
    label: "Analyst",
    icon: BarChart3,
    description: "Can view records and access charts & insights.",
    color: "border-amber-500/40 hover:border-amber-500 hover:bg-amber-500/5",
  },
  {
    key: "admin" as const,
    label: "Admin",
    icon: ShieldCheck,
    description: "Full access: create, update, manage records & users.",
    color: "border-green-500/40 hover:border-green-500 hover:bg-green-500/5",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleRoleLogin = (role: "viewer" | "analyst" | "admin") => {
    signIn(role);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <DollarSign className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">FinDash</h1>
          <p className="mt-2 text-muted-foreground">
            Finance Dashboard — Select a role to explore
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((r) => (
            <Card
              key={r.key}
              className={`cursor-pointer border-2 transition-all ${r.color}`}
              onClick={() => handleRoleLogin(r.key)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <r.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{r.label}</CardTitle>
                  <CardDescription className="mt-0.5">{r.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  Enter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Login;
