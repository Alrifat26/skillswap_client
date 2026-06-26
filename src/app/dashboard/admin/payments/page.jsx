"use client";

import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();

      setPayments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const averageRevenue =
    payments.length > 0
      ? Math.round(totalRevenue / payments.length)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-10 shadow-2xl">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>

        <h1 className="text-5xl font-extrabold">
          Payment Overview 💳
        </h1>

        <p className="mt-3 text-lg text-white/80">
          Track revenue, transactions and platform
          earnings.
        </p>
      </div>

      {/* STATS */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="text-slate-400">
            Total Revenue
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-emerald-400">
            ${totalRevenue}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Platform earnings
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="text-slate-400">
            Transactions
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-cyan-400">
            {payments.length}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Completed payments
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="text-slate-400">
            Average Transaction
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-yellow-400">
            ${averageRevenue}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Per payment
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-10 rounded-[32px] border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <h2 className="text-3xl font-bold">
            Transaction History
          </h2>

          <p className="mt-2 text-slate-400">
            All Stripe payment records
          </p>
        </div>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="p-5 text-slate-400">
                    Client
                  </th>

                  <th className="p-5 text-slate-400">
                    Freelancer
                  </th>

                  <th className="p-5 text-slate-400">
                    Amount
                  </th>

                  <th className="p-5 text-slate-400">
                    Date
                  </th>

                  <th className="p-5 text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >
                    <td className="p-5">
                      {payment.client_email}
                    </td>

                    <td className="p-5">
                      {payment.freelancer_email}
                    </td>

                    <td className="p-5 font-bold text-emerald-400">
                      ${payment.amount}
                    </td>

                    <td className="p-5 text-slate-400">
                      {payment.paid_at}
                    </td>

                    <td className="p-5">
                      <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-bold text-emerald-400">
                        {payment.payment_status ||
                          "paid"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="text-7xl">💳</div>

            <h3 className="mt-6 text-3xl font-bold">
              No Payments Yet
            </h3>

            <p className="mt-3 text-slate-400">
              Stripe transactions will appear here
              automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}