"use client";

import { useEffect, useState } from "react";

export default function FreelancerDashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalProposals: 0,
    acceptedJobs: 0,
    earnings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🎯 এপিআই লিংকটি পারফেক্টলি ফিক্স করা হলো যেন ৪MD বা DOCTYPE এরর না আসে
    fetch("/api/dashboard/freelancer")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalTasks: data.completedProjects || 0,
          totalProposals: data.totalProposals || 0,
          acceptedJobs: data.acceptedProjects || 0,
          earnings: data.earnings || 0,
        });

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

        {/* Hero */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 sm:p-8 text-white shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome Freelancer 👋
          </h1>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-orange-100">
            Discover new opportunities, send proposals and grow your freelance career.
          </p>
        </div>

        {loading ? (
          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-10 text-center shadow-lg font-semibold">
            Loading...
          </div>
        ) : (
          <>
            {/* Stats - মোবাইলেও গ্রিড সুন্দর দেখাবে */}
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
                <p className="text-sm sm:text-base text-slate-500">
                  Completed Jobs
                </p>

                <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
                  {stats.totalTasks}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-400">
                  Finished projects
                </p>
              </div>

              <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
                <p className="text-sm sm:text-base text-slate-500">
                  My Proposals
                </p>
                <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-blue-600">
                  {stats.totalProposals}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-400">
                  Submitted bids
                </p>
              </div>

              <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
                <p className="text-sm sm:text-base text-slate-500">
                  Accepted Jobs
                </p>

                <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-green-600">
                  {stats.acceptedJobs}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-400">
                  Active contracts
                </p>
              </div>

              <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
                <p className="text-sm sm:text-base text-slate-500">
                  Earnings
                </p>

                <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-orange-500">
                  ${stats.earnings}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-400">
                  Total income
                </p>
              </div>

            </div>

            {/* Main Card */}
            <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 text-center shadow-sm border border-slate-100">

              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl sm:text-3xl">
                  🚀
                </span>
              </div>

              <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-slate-900">
                Ready To Grow?
              </h2>

              <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md mx-auto">
                Browse available tasks, submit proposals and increase your earnings.
              </p>

            </div>
          </>
        )}
      </div>
    </div>
  );
}