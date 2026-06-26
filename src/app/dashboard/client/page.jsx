"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    openTasks: 0,
    inProgress: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    
    fetch("/api/dashboard/client")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    
    <div className="p-4 sm:p-8 text-black bg-slate-100 min-h-screen">
      
     
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Welcome Back 👋
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-orange-100 max-w-xl">
              Manage your freelance tasks, proposals and payments from one beautiful dashboard.
            </p>
          </div>

          <Link
            href="/dashboard/client/post-task"
            className="rounded-2xl bg-white px-6 py-3 text-center font-semibold text-orange-600 transition hover:scale-105 shadow-md w-full md:w-auto text-sm sm:text-base"
          >
            + Post New Task
          </Link>
        </div>
      </div>

      
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        
        {/* Card 1 */}
        <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
          <p className="text-xs sm:text-sm text-slate-500">
            Total Tasks
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
            {stats.totalTasks}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-green-600 font-medium">
            All tasks created
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
          <p className="text-xs sm:text-sm text-slate-500">
            Open Tasks
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-green-600">
            {stats.openTasks}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Waiting for proposals
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
          <p className="text-xs sm:text-sm text-slate-500">
            In Progress
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-blue-600">
            {stats.inProgress}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Active projects
          </p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
          <p className="text-xs sm:text-sm text-slate-500">
            Total Spent
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-orange-500">
            ${stats.totalSpent}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Payments completed
          </p>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Recent Tasks
          </h2>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs sm:text-sm font-medium text-green-600 shrink-0">
            Live Data
          </span>
        </div>

        {/* Empty State Content */}
        <div className="mt-8 sm:mt-12 text-center max-w-md mx-auto">
          <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-orange-100">
            <span className="text-2xl sm:text-3xl">📋</span>
          </div>

          <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold text-slate-900">
            No tasks yet
          </h3>

          <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
            Create your first freelance task and start receiving proposals from talented freelancers.
          </p>

          <Link
            href="/dashboard/client/post-task"
            className="mt-6 inline-block w-full sm:w-auto rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600 shadow-md text-sm sm:text-base"
          >
            Create First Task
          </Link>
        </div>
      </div>
    </div>
  );
}