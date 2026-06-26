"use client";

import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await fetch("/api/admin/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      {/* Hero */}
      <div className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-white shadow-2xl">
        <h1 className="text-5xl font-extrabold">
          Transactions History 💳
        </h1>

        <p className="mt-3 text-lg text-green-100">
          View all payment transactions on the platform.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[28px] bg-white p-8 shadow-xl">
          <p className="font-medium text-slate-600">
            Total Transactions
          </p>

          <h2 className="mt-4 text-6xl font-extrabold text-emerald-600">
            {transactions.length}
          </h2>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-xl">
          <p className="font-medium text-slate-600">
            Successful Payments
          </p>

          <h2 className="mt-4 text-6xl font-extrabold text-green-600">
            {
              transactions.filter(
                (item) =>
                  item.payment_status === "paid"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-xl">
          <p className="font-medium text-slate-600">
            Total Revenue
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-blue-600">
            $
            {transactions.reduce(
              (total, item) =>
                total + Number(item.amount || 0),
              0
            )}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="border-b p-6">
          <h2 className="text-2xl font-bold">
            Payment Records
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-5 text-left">
                  Client Email
                </th>

                <th className="p-5 text-left">
                  Freelancer Email
                </th>

                <th className="p-5 text-left">
                  Amount
                </th>

                <th className="p-5 text-left">
                  Date
                </th>

                <th className="p-5 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-5 font-medium">
                      {item.client_email}
                    </td>

                    <td className="p-5">
                      {item.freelancer_email}
                    </td>

                    <td className="p-5 font-bold text-green-600">
                      ${item.amount}
                    </td>

                    <td className="p-5">
                      {item.paid_at
                        ? new Date(
                            item.paid_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-5">
                      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                        {item.payment_status ||
                          "paid"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-16 text-center"
                  >
                    <div className="text-6xl">
                      💳
                    </div>

                    <h3 className="mt-4 text-2xl font-bold">
                      No Transactions Found
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Payment history will appear
                      here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}