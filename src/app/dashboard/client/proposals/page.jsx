"use client";

import { useEffect, useState } from "react";

export default function ClientProposalsPage() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    try {
      const res = await fetch("/api/proposals");
      const data = await res.json();
      setProposals(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    proposalId,
    status,
    taskId
  ) => {
    try {
      const res = await fetch(
        `/api/proposals/${proposalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            taskId,
          }),
        }
      );

      if (res.ok) {
        loadProposals();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = (proposal) => {
    window.location.href = `/payment/checkout?proposalId=${proposal._id}&taskId=${proposal.taskId}`;
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Freelancer Proposals
        </h1>

        <p className="mt-3 text-orange-100">
          Review proposals submitted by freelancers for your tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Proposals
          </p>

          <h2 className="mt-3 text-5xl font-bold text-orange-500">
            {proposals.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h2 className="mt-3 text-5xl font-bold text-yellow-500">
            {
              proposals.filter(
                (item) => item.status === "pending"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Accepted
          </p>

          <h2 className="mt-3 text-5xl font-bold text-green-500">
            {
              proposals.filter(
                (item) => item.status === "accepted"
              ).length
            }
          </h2>
        </div>
      </div>

      <div className="grid gap-6">
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {proposal.taskTitle}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    Freelancer: {proposal.freelancerName}
                  </p>

                  <p className="text-slate-500">
                    {proposal.freelancerEmail}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    Bid Amount
                  </p>

                  <h3 className="text-3xl font-bold text-green-600">
                    ${proposal.bidAmount}
                  </h3>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-100 p-4">
                <p className="text-slate-700">
                  {proposal.coverLetter}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    proposal.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : proposal.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {proposal.status}
                </span>

                {proposal.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handlePayment(proposal)
                      }
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      💳 Pay & Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          proposal._id,
                          "rejected",
                          proposal.taskId
                        )
                      }
                      className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      ✖ Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <span className="text-3xl">📨</span>
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              No Proposals Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Freelancer proposals will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}