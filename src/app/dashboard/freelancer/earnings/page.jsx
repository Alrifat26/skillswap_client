"use client";

import { useEffect, useState } from "react";

export default function EarningsPage() {
const [earnings, setEarnings] =
useState([]);

useEffect(() => {
loadEarnings();
}, []);

const loadEarnings = async () => {
try {
const res = await fetch(
"NEXT_PUBLIC_URL/api/payments/earnings"
);


  const data = await res.json();

  setEarnings(data);
} catch (error) {
  console.error(error);
}


};

const totalEarnings =
earnings.reduce(
(sum, item) =>
sum +
Number(item.amount || 0),
0
);

return ( <div className="min-h-screen bg-slate-950 p-8"> <div className="rounded-[32px] bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-10 shadow-2xl"> <h1 className="text-5xl font-black text-white">
My Earnings 💰 </h1>


    <p className="mt-4 text-lg text-green-100">
      Track your completed projects and payments.
    </p>
  </div>

  <div className="mt-8 grid gap-6 md:grid-cols-2">
    <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 shadow-xl">
      <p className="text-green-100">
        Total Earnings
      </p>

      <h2 className="mt-3 text-6xl font-black text-white">
        ${totalEarnings}
      </h2>
    </div>

    <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 p-8 shadow-xl">
      <p className="text-blue-100">
        Total Payments
      </p>

      <h2 className="mt-3 text-6xl font-black text-white">
        {earnings.length}
      </h2>
    </div>
  </div>

  <div className="mt-10 overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl">
    <div className="border-b border-slate-800 p-6">
      <h2 className="text-3xl font-black text-white">
        Earnings History
      </h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-5 text-left text-white">
              Client
            </th>

            <th className="p-5 text-left text-white">
              Amount
            </th>

            <th className="p-5 text-left text-white">
              Transaction
            </th>

            <th className="p-5 text-left text-white">
              Date
            </th>

            <th className="p-5 text-left text-white">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {earnings.map(
            (item) => (
              <tr
                key={item._id}
                className="border-t border-slate-800"
              >
                <td className="p-5 text-white">
                  {item.client_email}
                </td>

                <td className="p-5 font-bold text-green-400">
                  ${item.amount}
                </td>

                <td className="p-5 text-slate-300">
                  {item.transaction_id}
                </td>

                <td className="p-5 text-slate-300">
                  {item.paid_at}
                </td>

                <td className="p-5">
                  <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
                    {item.payment_status}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {earnings.length === 0 && (
        <div className="p-16 text-center">
          <h3 className="text-3xl font-bold text-white">
            No Earnings Yet
          </h3>

          <p className="mt-2 text-slate-400">
            Completed payments will appear here.
          </p>
        </div>
      )}
    </div>
  </div>
</div>


);
}
