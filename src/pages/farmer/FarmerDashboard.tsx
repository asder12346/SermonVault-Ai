import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FarmerLayout } from '@/components/layouts/FarmerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Package, ShoppingCart, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { FarmerStats, Notification, Order } from '@/lib/types';
import { Button } from '@/components/ui/button';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { farmer, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<FarmerStats>({
    totalListings: 0,
    activeOrders: 0,
    completedSales: 0,
    totalEarnings: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!farmer) {
      navigate('/onboarding');
      return;
    }
    fetchDashboardData();
  }, [farmer, authLoading, navigate]);

  const fetchDashboardData = async () => {
    if (!farmer) return;

    try {
      // Fetch listings count
      const { count: listingsCount } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('farmer_id', farmer.id);

      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('farmer_id', farmer.id)
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: notificationData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', farmer.user_id)
        .order('created_at', { ascending: false })
        .limit(3);

      const activeOrders = orders?.filter(o =>
        ['pending', 'accepted', 'shipped'].includes(o.status)
      ).length || 0;

      const completedOrders = orders?.filter(o => o.status === 'delivered').length || 0;

      setStats({
        totalListings: listingsCount || 0,
        activeOrders,
        completedSales: farmer.total_sales || 0,
        totalEarnings: farmer.total_earnings || 0,
      });

      setRecentOrders(orders as Order[] || []);
      setNotifications(notificationData as Notification[] || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <FarmerLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your farm's performance</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6" onClick={() => navigate('/farmer/listings/new')}>
            + New Listing
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Completed Sales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedSales.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 border-none shadow-lg shadow-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => navigate('/farmer/orders')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">No orders yet</p>
                  <p className="text-sm text-gray-400">Orders will appear here when buyers purchase your products</p>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-100 text-gray-400">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-500">
                            {order.quantity} units · ${order.total_price}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${getOrderStatusColor(order.status)} border px-3 py-1 rounded-full capitalize`}>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-none shadow-lg shadow-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500">No new notifications</p>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 rounded-xl bg-gray-50 border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-gray-900">{notification.title}</h4>
                        {!notification.is_read && (
                          <span className="w-2 h-2 rounded-full bg-green-500 block" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{notification.message}</p>
                    </div>
                  ))}
                </div>
              )}
              <Button variant="outline" className="w-full mt-6 rounded-xl" onClick={() => navigate('/farmer/notifications')}>
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default FarmerDashboard;
