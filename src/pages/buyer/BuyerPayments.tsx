import { useEffect, useState } from "react";
import { BuyerLayout } from "@/components/layouts/BuyerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Transaction } from "@/lib/types";

const BuyerPayments = () => {
  const { buyer } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!buyer) return;

    const fetchTransactions = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("buyer_id", buyer.id)
        .order("created_at", { ascending: false });

      setTransactions((data as Transaction[]) || []);
      setLoading(false);
    };

    fetchTransactions();
  }, [buyer]);

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track your payment history and transaction status.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading transactions...</p>
            ) : transactions.length === 0 ? (
              <p className="text-muted-foreground">No payments recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4">
                    <div>
                      <p className="font-semibold text-foreground">Order #{transaction.order_id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(transaction.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${transaction.amount.toLocaleString()}</p>
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
    </BuyerLayout>
  );
};

export default BuyerPayments;
