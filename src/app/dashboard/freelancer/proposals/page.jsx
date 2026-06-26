"use client";

import { useEffect, useState } from "react";

export default function MyProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proposals?freelancerEmail=freelancer@email.com")
      .then((res) => res.json())
      .then((data) => {
        setProposals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 text-black">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 sm:p-8 text-white shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Proposals 📨
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100">
            Track all submitted proposals
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-6 sm:mt-8 overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg">

          {loading ? (
            <div className="p-10 text-center text-black font-semibold">
              Loading...
            </div>
          ) : proposals.length === 0 ? (
            <div className="p-10 text-center text-black font-semibold">
              No proposals found
            </div>
          ) : (
            <>
              {/* ১. মোবাইল স্ক্রিনের জন্য কার্ড লেআউট (শুধুমাত্র sm বা ছোট স্ক্রিনে দেখাবে) */}
              <div className="block sm:hidden divide-y divide-slate-100">
                {proposals.map((proposal) => (
                  <div key={proposal._id} className="p-5 space-y-3 hover:bg-slate-50 transition">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-black text-lg leading-tight">
                        {proposal.taskTitle}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                          proposal.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : proposal.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {proposal.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-1 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Budget Bid</p>
                        <p className="font-bold text-base text-blue-600">${proposal.bidAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Date Sent</p>
                        <p className="text-slate-600 font-medium">
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ২. ডেস্কটপ ও ট্যাবলেটের জন্য আগের সেই টেবিল লেআউট (sm স্ক্রিন থেকে শুরু হবে) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-slate-800">
                  <thead className="bg-slate-100 text-black">
                    <tr>
                      <th className="p-4 text-left font-bold">Task Title</th>
                      <th className="p-4 text-left font-bold">Budget Bid</th>
                      <th className="p-4 text-left font-bold">Date Sent</th>
                      <th className="p-4 text-left font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals.map((proposal) => (
                      <tr
                        key={proposal._id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4 font-medium text-black">
                          {proposal.taskTitle}
                        </td>
                        <td className="p-4 font-medium text-black">
                          ${proposal.bidAmount}
                        </td>
                        <td className="p-4 text-black">
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-bold ${
                              proposal.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : proposal.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {proposal.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}