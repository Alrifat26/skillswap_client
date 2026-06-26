"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplicantsPage() {
  const params = useParams();
  const taskId = params.taskId;

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProposals = async () => {
    try {
      const res = await fetch(
        `NEXT_PUBLIC_URL/api/proposals/${taskId}`
      );

      const data = await res.json();

      setProposals(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      loadProposals();
    }
  }, [taskId]);

  const updateStatus = async (
    proposalId,
    status
  ) => {
    try {
      await fetch(
        `NEXT_PUBLIC_URL/api/proposals/${proposalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      loadProposals();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold">
            Task Applicants
          </h1>

          <p className="mt-2 text-green-100">
            Manage freelancer proposals
          </p>
        </div>

        <div className="mt-8 space-y-6">

          {proposals.length === 0 && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
              <h2 className="text-2xl font-bold">
                No Applicants Found
              </h2>
            </div>
          )}

          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {proposal.freelancerName}
                  </h2>

                  <p className="text-slate-500">
                    {proposal.freelancerEmail}
                  </p>

                  <div className="mt-4">
                    <span className="font-semibold">
                      Bid Amount:
                    </span>{" "}
                    ${proposal.bidAmount}
                  </div>

                  <div className="mt-3">
                    <span className="font-semibold">
                      Task:
                    </span>{" "}
                    {proposal.taskTitle}
                  </div>

                  <p className="mt-5 rounded-xl bg-slate-100 p-4 text-slate-700">
                    {proposal.coverLetter}
                  </p>

                  <div className="mt-5">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        proposal.status ===
                        "accepted"
                          ? "bg-green-100 text-green-700"
                          : proposal.status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {proposal.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        proposal._id,
                        "accepted"
                      )
                    }
                    className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        proposal._id,
                        "rejected"
                      )
                    }
                    className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
                  >
                    Reject
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}