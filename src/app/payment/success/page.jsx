"use client";

import { useEffect, useState, Suspense } from "react"; 
import { useSearchParams } from "next/navigation";
import Link from "next/link";


function SuccessContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const taskId = searchParams.get("taskId");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId && taskId) {
      savePayment();
    } else {
      
      setLoading(false);
    }
  }, [sessionId, taskId]);

  const savePayment = async () => {
    try {
     
      await fetch("/api/payments/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          taskId,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          <h2 className="mt-6 text-3xl font-bold text-black">Verifying Payment...</h2>
          <p className="mt-2 text-slate-500">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-black">
      <div className="w-full max-w-xl rounded-[32px] bg-white p-12 text-center shadow-2xl">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-6xl">
          ✅
        </div>

        <h1 className="mt-8 text-5xl font-extrabold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Your payment has been completed successfully.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/dashboard/client/tasks"
            className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            My Tasks
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-8 py-4 font-bold transition hover:bg-slate-100 text-slate-700"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}


export default function PaymentSuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            <h2 className="mt-6 text-3xl font-bold text-black">Loading...</h2>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}