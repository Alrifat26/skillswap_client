"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    activeTasks: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 text-black">
      
      {/* Hero Section */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 p-6 sm:p-8 text-white shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Admin Dashboard 👑
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-purple-100 max-w-xl">
          Monitor users, tasks, transactions and platform activity.
        </p>
      </div>

      {loading ? (
        <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-10 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold">
            Loading Dashboard...
          </h2>
        </div>
      ) : (
        <>
          
          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            
            {/* Total Users */}
            <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-500/10">
              <p className="text-sm text-slate-500">Total Users</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
                {stats.totalUsers}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">Registered users</p>
            </div>

            
            <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-500/10">
              <p className="text-sm text-slate-500">Total Tasks</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-blue-600">
                {stats.totalTasks}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">Tasks posted</p>
            </div>

            
            <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-500/10">
              <p className="text-sm text-slate-500">Active Tasks</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-green-600">
                {stats.activeTasks}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">Currently active</p>
            </div>

            
            <div className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-500/10">
              <p className="text-sm text-slate-500">Total Revenue</p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-orange-500">
                ${stats.totalRevenue}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">Platform earnings</p>
            </div>
          </div>

          
          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 text-center shadow-sm border border-slate-500/10">
            <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-purple-100">
              <span className="text-2xl sm:text-3xl">📊</span>
            </div>
            <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-slate-900">
              Platform Overview
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md mx-auto">
              All statistics are loaded directly from MongoDB collections.
            </p>
          </div>

          
          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 p-5 sm:p-6 text-white shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold">Users</h3>
              <p className="mt-2 text-sm sm:text-base text-green-50">
                Manage all registered clients and freelancers.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 p-5 sm:p-6 text-white shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold">Tasks</h3>
              <p className="mt-2 text-sm sm:text-base text-blue-50">
                Monitor all posted freelance tasks.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-5 sm:p-6 text-white shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold">Revenue</h3>
              <p className="mt-2 text-sm sm:text-base text-orange-50">
                Track all completed payments and earnings.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}