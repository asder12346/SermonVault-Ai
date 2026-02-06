import { useEffect, useMemo, useState } from "react";
import { FarmerLayout } from "@/components/layouts/FarmerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Transaction } from "@/lib/types";

const FarmerEarnings = () => {
  const { farmer } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!farmer) return;

    const fetchTransactions = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("farmer_id", farmer.id)
        .order("created_at", { ascending: false });

      setTransactions((data as Transaction[]) || []);
      setLoading(false);
    };

    fetchTransactions();
  }, [farmer]);

  const totalEarnings = useMemo(
    () => transactions.reduce((sum, item) => sum + (item.farmer_earnings || 0), 0),
    [transactions]
  );

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
          <p className="text-muted-foreground">Monitor payouts and revenue from your sales.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">${totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <span className="text-success font-bold">$</span>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">#</span>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Payout</p>
                <p className="text-2xl font-bold text-foreground">
                  ${transactions.length ? Math.round(totalEarnings / transactions.length).toLocaleString() : 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-bold">≈</span>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading payouts...</p>
            ) : transactions.length === 0 ? (
              <p className="text-muted-foreground">No earnings yet.</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4">
                    <div>
                      <p className="font-semibold text-foreground">Order #{transaction.order_id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(transaction.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${transaction.farmer_earnings.toLocaleString()}</p>
                      <Badge variant="outline" className="capitalize mt-1">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  );
};

export default FarmerEarnings;
