import { useEffect, useState } from "react";
import { BuyerLayout } from "@/components/layouts/BuyerLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BuyerProfile = () => {
  const { profile, buyer, user, loading } = useAuth();
  const [kycBvn, setKycBvn] = useState("");
  const [kycNin, setKycNin] = useState("");
  const [savingKyc, setSavingKyc] = useState(false);

  const displayName = profile?.full_name || user?.email || "Buyer";
  const initials = (profile?.full_name || user?.email || "B").slice(0, 1).toUpperCase();

  useEffect(() => {
    setKycBvn(profile?.kyc_bvn || "");
    setKycNin(profile?.kyc_nin || "");
  }, [profile?.kyc_bvn, profile?.kyc_nin]);

  const handleKycSave = async () => {
    if (!user) return;
    setSavingKyc(true);
    const { error } = await supabase
      .from("profiles")
      .update({ kyc_bvn: kycBvn || null, kyc_nin: kycNin || null })
      .eq("id", user.id);
    setSavingKyc(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("KYC details updated.");
  };

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account and buyer details</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url ?? undefined} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">{displayName}</p>
                <p className="text-sm text-muted-foreground">{profile?.email || user?.email || ""}</p>
                {profile?.phone && (
                  <p className="text-sm text-muted-foreground">{profile.phone}</p>
                )}
                {loading && (
                  <p className="text-sm text-muted-foreground">Loading...</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">KYC Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kycBvn">BVN</Label>
                <Input
                  id="kycBvn"
                  placeholder="Enter BVN"
                  value={kycBvn}
                  onChange={(event) => setKycBvn(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kycNin">NIN</Label>
                <Input
                  id="kycNin"
                  placeholder="Enter NIN"
                  value={kycNin}
                  onChange={(event) => setKycNin(event.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleKycSave} disabled={savingKyc}>
                {savingKyc ? "Saving..." : "Save KYC"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!buyer ? (
              <p className="text-sm text-muted-foreground">No buyer profile found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="font-medium text-foreground">{buyer.business_name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="font-medium text-foreground">{buyer.business_type || "-"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{buyer.location}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{buyer.address || "-"}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium text-foreground">{buyer.contact_person || "-"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="font-medium text-foreground">{buyer.total_orders.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Total Spend</p>
                  <p className="font-medium text-foreground">${buyer.total_spend.toLocaleString()}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>
  );
};

export default BuyerProfile;
