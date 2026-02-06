import { serve } from "https://deno.land/std@0.214.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
  const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

  if (!razorpayKeyId || !razorpayKeySecret) {
    return new Response(JSON.stringify({ error: "Razorpay keys are not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const body = await req.json().catch(() => null);
  if (!body?.amount || !body?.currency || !body?.receipt) {
    return new Response(JSON.stringify({ error: "amount, currency, and receipt are required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // TODO: Create order with Razorpay once keys are available.
  // This placeholder returns a stub response so the frontend can integrate later.
  return new Response(
    JSON.stringify({
      orderId: "razorpay_order_placeholder",
      amount: body.amount,
      currency: body.currency,
      receipt: body.receipt,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
