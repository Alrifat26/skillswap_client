"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; 

function CheckoutContent() {
  const searchParams = useSearchParams();
  const proposalId = searchParams.get("proposalId");
  const taskId = searchParams.get("taskId");

  const handlePayment = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proposalId,
        taskId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/payment/success";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[40px] border border-slate-800 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 p-10 text-white shadow-2xl">
          <h1 className="text-5xl font-black">Secure Payment Checkout</h1>
          <p className="mt-4 text-lg text-green-50">
            Complete your payment and hire your selected freelancer instantly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[32px] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <h2 className="mb-6 text-3xl font-bold text-white">Payment Details</h2>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Card Holder Name"
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-green-500"
              />

              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-green-500"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-green-500"
                />

                <input
                  type="text"
                  placeholder="CVC"
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-green-500"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02]"
            >
              Complete Secure Payment
            </button>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white">Order Summary</h2>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Project Fee</span>
                <span className="font-bold text-white">$2,900</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Platform Fee</span>
                <span className="font-bold text-white">$0</span>
              </div>

              <div className="border-t border-slate-700 pt-5">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-black text-green-400">$2,900</span>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-green-500/10 p-5">
              <p className="text-sm text-green-400">🔒 Protected by Stripe Checkout Security</p>
            </div>

            <div className="mt-5 rounded-2xl bg-blue-500/10 p-5">
              <p className="text-sm text-blue-400">⚡ Instant project activation after payment confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-semibold text-xl">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}