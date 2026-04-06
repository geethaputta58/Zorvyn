import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockTransactions } from "@/data/mockTransactions";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Wallet, ArrowLeftRight, Eye, BarChart3, ShieldCheck, LogOut } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
const COLORS = ["hsl(217,91%,60%)", "hsl(142,76%,36%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)", "hsl(280,65%,60%)", "hsl(180,60%,45%)"];

const ROLE_INFO = {
  viewer: { label: "Viewer", icon: Eye, description: "View dashboard data only" },
  analyst: { label: "Analyst", icon: BarChart3, description: "View records and access insights" },
  admin: { label: "Admin", icon: ShieldCheck, description: "Full management access" },
} as const;

const Dashboard = () => {
  const { role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const transactions = mockTransactions;

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);
  const netBalance = totalIncome - totalExpense;

  // Category breakdown
  const categoryMap = new Map<string, number>();
  transactions.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + Number(t.amount));
  });
  const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));

  // Monthly trends (last 6 months)
  const monthlyMap = new Map<string, { income: number; expense: number }>();
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    const existing = monthlyMap.get(month) || { income: 0, expense: 0 };
    if (t.type === "income") existing.income += Number(t.amount);
    else existing.expense += Number(t.amount);
    monthlyMap.set(month, existing);
  });
  const monthlyData = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleDateString("en", { month: "short", year: "2-digit" }),
      ...data,
    }));

  const recentTransactions = transactions.slice(0, 5);

  const statCards = [
    { label: "Total Income", value: totalIncome, icon: TrendingUp, color: "text-green-500" },
    { label: "Total Expenses", value: totalExpense, icon: TrendingDown, color: "text-red-500" },
    { label: "Net Balance", value: netBalance, icon: Wallet, color: netBalance >= 0 ? "text-green-500" : "text-red-500" },
    { label: "Transactions", value: transactions.length, icon: ArrowLeftRight, color: "text-primary", isCurrency: false },
  ];

  const currentRole = role || "viewer";
  const roleInfo = ROLE_INFO[currentRole as keyof typeof ROLE_INFO] || ROLE_INFO.viewer;
  const RoleIcon = roleInfo.icon;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
              <RoleIcon className="h-3.5 w-3.5" />
              <span className="capitalize">{roleInfo.label}</span>
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Summary Cards — visible to all roles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Card key={card.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={cn("rounded-xl bg-muted p-3", card.color)}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">
                    {card.isCurrency === false ? card.value : `$${card.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts — visible to analyst and admin */}
        {(currentRole === "analyst" || currentRole === "admin") && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="income" fill="hsl(142,76%,36%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" fill="hsl(0,84%,60%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-[300px] items-center justify-center text-muted-foreground">No data yet</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {categoryData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="flex h-[300px] items-center justify-center text-muted-foreground">No data yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Viewer sees a simplified message instead of charts */}
        {currentRole === "viewer" && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Eye className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">Charts & Insights</p>
              <p className="text-sm text-muted-foreground/70">
                Upgrade to Analyst or Admin role to access detailed charts and analytics.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity — visible to all roles */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium capitalize">{t.category}</p>
                      <p className="text-sm text-muted-foreground">{new Date(t.date).toLocaleDateString()}{t.notes && ` · ${t.notes}`}</p>
                    </div>
                    <span className={t.type === "income" ? "font-semibold text-green-500" : "font-semibold text-red-500"}>
                      {t.type === "income" ? "+" : "-"}${Number(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">No transactions yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Dashboard;
