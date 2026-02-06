import { useEffect, useMemo, useState } from "react";
import { BuyerLayout } from "@/components/layouts/BuyerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Notification } from "@/lib/types";

const BuyerNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.is_read).length,
    [notifications]
  );

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications((data as Notification[]) || []);
      setLoading(false);
    };

    fetchNotifications();

    const channel = supabase
      .channel(`buyer-notifications-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setNotifications((prev) => prev.filter((item) => item.id !== payload.old.id));
            return;
          }

          const updated = payload.new as Notification;
          setNotifications((prev) => {
            const exists = prev.find((item) => item.id === updated.id);
            if (exists) {
              return prev.map((item) => (item.id === updated.id ? updated : item));
            }
            return [updated, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (!error) {
      setNotifications((prev) => prev.map((item) => ({ ...item, is_read: true })));
    }
  };

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Realtime updates from your orders and marketplace activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">{unreadCount} unread</Badge>
            <Button variant="outline" onClick={markAllRead} disabled={unreadCount === 0}>
              Mark all read
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inbox</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="text-muted-foreground">You have no notifications yet.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-xl border p-4 ${
                      notification.is_read ? "bg-card" : "bg-accent/5 border-accent/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{notification.title}</h3>
                          {!notification.is_read && (
                            <span className="text-xs font-semibold text-accent">New</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                      {notification.type && (
                        <Badge className="capitalize" variant="secondary">
                          {notification.type}
                        </Badge>
                      )}
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

export default BuyerNotifications;
