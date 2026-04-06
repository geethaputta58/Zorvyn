/**
 * Mock/Static transaction data used as fallback when no database records exist.
 * This provides a realistic preview of the dashboard for demonstration purposes.
 * 
 * Storage approach: Client-side static data (no persistence).
 * In production, all data comes from the Lovable Cloud database.
 */

export interface MockTransaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  notes: string | null;
  user_id: string;
  is_deleted: boolean;
}

export const mockTransactions: MockTransaction[] = [
  { id: "mock-1", amount: 5200, type: "income", category: "Salary", date: "2026-04-01", notes: "Monthly salary", user_id: "mock", is_deleted: false },
  { id: "mock-2", amount: 1200, type: "income", category: "Freelance", date: "2026-03-28", notes: "Web design project", user_id: "mock", is_deleted: false },
  { id: "mock-3", amount: 450, type: "expense", category: "Utilities", date: "2026-03-25", notes: "Electricity & internet", user_id: "mock", is_deleted: false },
  { id: "mock-4", amount: 320, type: "expense", category: "Food", date: "2026-03-22", notes: "Weekly groceries", user_id: "mock", is_deleted: false },
  { id: "mock-5", amount: 800, type: "income", category: "Investments", date: "2026-03-20", notes: "Dividend payout", user_id: "mock", is_deleted: false },
  { id: "mock-6", amount: 150, type: "expense", category: "Transport", date: "2026-03-18", notes: "Fuel", user_id: "mock", is_deleted: false },
  { id: "mock-7", amount: 95, type: "expense", category: "Entertainment", date: "2026-03-15", notes: "Movie & dinner", user_id: "mock", is_deleted: false },
  { id: "mock-8", amount: 5200, type: "income", category: "Salary", date: "2026-03-01", notes: "Monthly salary", user_id: "mock", is_deleted: false },
  { id: "mock-9", amount: 600, type: "expense", category: "Healthcare", date: "2026-02-28", notes: "Annual checkup", user_id: "mock", is_deleted: false },
  { id: "mock-10", amount: 250, type: "expense", category: "Education", date: "2026-02-20", notes: "Online course", user_id: "mock", is_deleted: false },
  { id: "mock-11", amount: 5200, type: "income", category: "Salary", date: "2026-02-01", notes: "Monthly salary", user_id: "mock", is_deleted: false },
  { id: "mock-12", amount: 900, type: "income", category: "Freelance", date: "2026-01-25", notes: "Logo design", user_id: "mock", is_deleted: false },
  { id: "mock-13", amount: 380, type: "expense", category: "Food", date: "2026-01-20", notes: "Groceries", user_id: "mock", is_deleted: false },
  { id: "mock-14", amount: 5200, type: "income", category: "Salary", date: "2026-01-01", notes: "Monthly salary", user_id: "mock", is_deleted: false },
  { id: "mock-15", amount: 1500, type: "expense", category: "Other", date: "2025-12-15", notes: "Holiday gifts", user_id: "mock", is_deleted: false },
  { id: "mock-16", amount: 5200, type: "income", category: "Salary", date: "2025-12-01", notes: "Monthly salary", user_id: "mock", is_deleted: false },
  { id: "mock-17", amount: 200, type: "expense", category: "Transport", date: "2025-11-28", notes: "Train tickets", user_id: "mock", is_deleted: false },
  { id: "mock-18", amount: 5200, type: "income", category: "Salary", date: "2025-11-01", notes: "Monthly salary", user_id: "mock", is_deleted: false },
];
