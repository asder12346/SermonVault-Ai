import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BuyerLayout } from '@/components/layouts/BuyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, DollarSign, TrendingUp, Package, Store, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { BuyerStats, Order, Listing } from '@/lib/types';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { buyer, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<BuyerStats>({
    activeOrders: 0,
    completedOrders: 0,
    totalSpend: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!buyer) {
        navigate('/onboarding');
        return;
      }
      fetchDashboardData();
    }
  }, [buyer, authLoading, navigate]);

  const fetchDashboardData = async () => {
    if (!buyer) return;

    try {
      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_id', buyer.id)
        .order('created_at', { ascending: false })
        .limit(5);

      const activeOrders = orders?.filter(o =>
        ['pending', 'accepted', 'shipped'].includes(o.status)
      ).length || 0;

      const completedOrders = orders?.filter(o => o.status === 'delivered').length || 0;

      // Fetch featured listings
      const { data: listings } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(4);

      setStats({
        activeOrders,
        completedOrders: buyer.total_orders || 0,
        totalSpend: buyer.total_spend || 0,
      });

      setRecentOrders(orders as Order[] || []);
      setFeaturedListings(listings as Listing[] || []);
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
    <BuyerLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your orders and discover fresh produce</p>
          </div>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 shadow-lg shadow-orange-600/20">
            <Link to="/buyer/marketplace">
              <Store className="w-4 h-4 mr-2" />
              Browse Marketplace
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                <p className="text-sm font-medium text-gray-500 mb-1">Completed Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Spend</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalSpend.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="border-none shadow-lg shadow-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Recent Orders
              </CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                <Link to="/buyer/orders">View all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">No orders yet</p>
                  <p className="text-sm text-gray-400">Start browsing the marketplace to place orders</p>
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

          {/* Featured Listings */}
          <Card className="border-none shadow-lg shadow-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Store className="w-5 h-5 text-green-600" />
                Featured Products
              </CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <Link to="/buyer/marketplace">See all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {featuredListings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500">No listings available</p>
                  <p className="text-sm text-gray-400">Check back soon for new products</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {featuredListings.map((listing) => (
                    <div key={listing.id} className="p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-200 group cursor-pointer">
                      <div className="aspect-square rounded-lg bg-gray-200 mb-3 overflow-hidden">
                         <img src={listing.image_url || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200'} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <p className="font-bold text-gray-900 truncate">{listing.title}</p>
                      <p className="text-xs text-gray-500 mb-2">{listing.category}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-green-600">
                          ${listing.price}/{listing.unit}
                        </p>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors shadow-sm">
                           <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default BuyerDashboard;
