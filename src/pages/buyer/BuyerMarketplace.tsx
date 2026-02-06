import { useState, useEffect } from 'react';
import { BuyerLayout } from '@/components/layouts/BuyerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Package, MapPin, Star, ShoppingCart, Loader2, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Listing, Farmer } from '@/lib/types';

interface ListingWithFarmer extends Listing {
  farmers?: Farmer;
}

const BuyerMarketplace = () => {
  const { buyer } = useAuth();
  const [listings, setListings] = useState<ListingWithFarmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<ListingWithFarmer | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          farmers (*)
        `)
        .eq('status', 'approved')
        .gt('available_quantity', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data as ListingWithFarmer[] || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.farmers?.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrder = async () => {
    if (!buyer || !selectedListing) return;

    const qty = parseFloat(orderQuantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (qty > selectedListing.available_quantity) {
      toast.error('Quantity exceeds available stock');
      return;
    }

    setSubmitting(true);

    try {
      const totalPrice = qty * selectedListing.price;

      const { error } = await supabase.from('orders').insert({
        buyer_id: buyer.id,
        listing_id: selectedListing.id,
        farmer_id: selectedListing.farmer_id,
        quantity: qty,
        unit_price: selectedListing.price,
        total_price: totalPrice,
        delivery_address: orderAddress || buyer.address,
        status: 'pending',
      });

      if (error) throw error;

      // Update available quantity
      await supabase
        .from('listings')
        .update({ available_quantity: selectedListing.available_quantity - qty })
        .eq('id', selectedListing.id);

      toast.success('Order placed successfully!');
      setSelectedListing(null);
      setOrderQuantity('');
      setOrderAddress('');
      fetchListings();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BuyerLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-500 mt-1">Discover fresh, verified produce directly from farmers</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products, farmers, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full bg-white border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-50 hover:text-green-600">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto" />
            <p className="text-gray-500 mt-4">Loading fresh produce...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <Card className="border-dashed border-2 bg-gray-50/50">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No listings found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any produce matching your search. Try adjusting your filters or check back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  <img 
                    src={listing.image_url || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400'} 
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 backdrop-blur text-gray-900 hover:bg-white shadow-sm font-medium">
                      {listing.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="mb-3">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">
                        {listing.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {listing.description || 'Fresh, high-quality produce straight from the farm.'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-green-600" />
                    <span className="truncate">{listing.farmers?.location || 'Unknown location'}</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium text-gray-700">{listing.farmers?.farm_name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-green-700">${listing.price}</span>
                        <span className="text-sm text-gray-500">/{listing.unit}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="rounded-full bg-gray-900 hover:bg-green-600 text-white transition-colors shadow-lg shadow-gray-900/10 hover:shadow-green-600/20"
                      onClick={() => setSelectedListing(listing)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Dialog */}
        <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-bold text-center">Place Order</DialogTitle>
            </DialogHeader>
            {selectedListing && (
              <div className="space-y-6 mt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                    <img 
                      src={selectedListing.image_url || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200'} 
                      alt={selectedListing.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedListing.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{selectedListing.farmers?.farm_name}</p>
                    <Badge variant="outline" className="text-xs bg-white text-green-700 border-green-200">
                      In Stock: {selectedListing.available_quantity} {selectedListing.unit}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                      Quantity ({selectedListing.unit})
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.01"
                      min="0.01"
                      max={selectedListing.available_quantity}
                      placeholder="0.00"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Delivery Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter full delivery address"
                      value={orderAddress}
                      onChange={(e) => setOrderAddress(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                {orderQuantity && parseFloat(orderQuantity) > 0 && (
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                    <span className="font-medium text-green-900">Total Amount</span>
                    <span className="text-2xl font-bold text-green-700">
                      ${(parseFloat(orderQuantity) * selectedListing.price).toFixed(2)}
                    </span>
                  </div>
                )}

                <Button 
                  onClick={handleOrder} 
                  className="w-full h-12 rounded-full bg-green-600 hover:bg-green-700 text-lg font-medium shadow-lg shadow-green-600/20" 
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Order'
                  )}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </BuyerLayout>
  );
};

export default BuyerMarketplace;
