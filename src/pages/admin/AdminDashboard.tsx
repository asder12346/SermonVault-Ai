import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Leaf, 
  ShoppingBag, 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  Package, 
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { AdminStats, Farmer, Listing } from '@/lib/types';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalFarmers: 0,
    totalBuyers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingVerifications: 0,
    pendingListings: 0,
  });
  const [pendingFarmers, setPendingFarmers] = useState<Farmer[]>([]);
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch counts
      const [farmersRes, buyersRes, ordersRes, pendingFarmersRes, pendingListingsRes] = await Promise.all([
        supabase.from('farmers').select('*', { count: 'exact', head: true }),
        supabase.from('buyers').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('farmers').select('*').eq('verification_status', 'pending').limit(5),
        supabase.from('listings').select('*').eq('status', 'pending').limit(5),
      ]);

      // Calculate revenue from transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('amount')
        .eq('status', 'completed');

      const totalRevenue = transactions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

      setStats({
        totalFarmers: farmersRes.count || 0,
        totalBuyers: buyersRes.count || 0,
        totalOrders: ordersRes.count || 0,
        totalRevenue,
        pendingVerifications: pendingFarmersRes.data?.length || 0,
        pendingListings: pendingListingsRes.data?.length || 0,
      });

      setPendingFarmers(pendingFarmersRes.data as Farmer[] || []);
      setPendingListings(pendingListingsRes.data as Listing[] || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFarmer = async (farmerId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('farmers')
        .update({ verification_status: status })
        .eq('id', farmerId);

      if (error) throw error;

      toast.success(`Farmer ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleApproveListing = async (listingId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ status })
        .eq('id', listingId);

      if (error) throw error;

      toast.success(`Listing ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      fetchDashboardData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Platform overview and management actions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Farmers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalFarmers}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Buyers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBuyers}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {(stats.pendingVerifications > 0 || stats.pendingListings > 0) && (
          <div className="grid sm:grid-cols-2 gap-6">
            {stats.pendingVerifications > 0 && (
              <Card className="border-none shadow-md bg-amber-50/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{stats.pendingVerifications} Pending Verifications</p>
                    <p className="text-sm text-gray-600">Farmers waiting for your approval</p>
                  </div>
                </CardContent>
              </Card>
            )}
            {stats.pendingListings > 0 && (
              <Card className="border-none shadow-md bg-blue-50/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{stats.pendingListings} Pending Listings</p>
                    <p className="text-sm text-gray-600">Products waiting for your review</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Verifications */}
          <Card className="border-none shadow-lg shadow-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                Pending Farmer Verifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingFarmers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-gray-900 font-medium">All caught up!</p>
                  <p className="text-sm text-gray-500">No pending farmer verifications.</p>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {pendingFarmers.map((farmer) => (
                    <div key={farmer.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                      <div>
                        <p className="font-bold text-gray-900">{farmer.farm_name}</p>
                        <p className="text-sm text-gray-500">{farmer.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerifyFarmer(farmer.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-9 w-9 p-0"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerifyFarmer(farmer.id, 'rejected')}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg h-9 w-9 p-0"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending Listings */}
          <Card className="border-none shadow-lg shadow-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-500" />
                Pending Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingListings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-gray-900 font-medium">All caught up!</p>
                  <p className="text-sm text-gray-500">No pending listings reviews.</p>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                      <div>
                        <p className="font-bold text-gray-900">{listing.title}</p>
                        <p className="text-sm text-gray-500">
                          ${listing.price}/{listing.unit} · {listing.available_quantity} available
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveListing(listing.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-9 w-9 p-0"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproveListing(listing.id, 'rejected')}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg h-9 w-9 p-0"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
