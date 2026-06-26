"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const { taskId } = useParams();
  const router = useRouter();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await fetch(
          `/api/get-task?taskId=${taskId}`
        );

        if (!res.ok) {
          throw new Error("Task not found");
        }

        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      loadTask();
    }
  }, [taskId]);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          amount: task?.budget,
          title: task?.title,
          clientEmail: task?.client_email,
          freelancerEmail: task?.accepted_freelancer,
        }),
      });

      const text = await res.text();

      console.log("API Response:", text);

      const session = JSON.parse(text);

      if (!res.ok) {
        alert(session.message || "Payment Failed");
        return;
      }

      window.location.href = session.url;
    } catch (error) {
      console.error(error);
      alert("Payment Error");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-bold">
        Task Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold">
          Complete Payment 💳
        </h1>

        <p className="mt-3 text-slate-500">
          Secure payment powered by Stripe
        </p>

        <div className="mt-10 space-y-5 rounded-2xl bg-slate-50 p-6">
          <div className="flex justify-between">
            <span>Task</span>
            <span className="font-semibold">
              {task.title}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Freelancer</span>
            <span className="font-semibold">
              {task.accepted_freelancer}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Budget</span>
            <span className="text-2xl font-bold text-green-600">
              ${task.budget}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700"
        >
          Pay ${task.budget}
        </button>

        <button
          onClick={() => router.back()}
          className="mt-4 w-full rounded-2xl border py-4 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}