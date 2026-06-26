"use client";

import { useEffect, useState } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBlock = async (
    id,
    currentStatus
  ) => {
    try {
      const res = await fetch(
        `/api/admin/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            isBlocked:
              !currentStatus,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setUsers(
          users.map((user) =>
            user._id === id
              ? {
                  ...user,
                  isBlocked:
                    !currentStatus,
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-8">
      {/* Hero */}
      <div className="rounded-[32px] bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
        <h1 className="text-5xl font-extrabold">
          Manage Users 👥
        </h1>

        <p className="mt-3 text-lg text-purple-100">
          View, manage and control all
          platform users.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[28px] bg-white p-8 shadow-xl">
          <p className="font-medium text-slate-600">
            Total Users
          </p>

          <h2 className="mt-4 text-6xl font-extrabold text-violet-600">
            {users.length}
          </h2>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-xl">
          <p className="font-medium text-slate-600">
            Freelancers
          </p>

          <h2 className="mt-4 text-6xl font-extrabold text-blue-600">
            {
              users.filter(
                (u) =>
                  u.role ===
                  "Freelancer"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-xl">
          <p className="font-medium text-slate-600">
            Clients
          </p>

          <h2 className="mt-4 text-6xl font-extrabold text-green-600">
            {
              users.filter(
                (u) =>
                  u.role ===
                  "Client"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Platform Users
          </h2>

          <p className="mt-1 text-slate-500">
            Monitor and manage all
            registered users.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <tr>
                <th className="p-5 text-left font-semibold">
                  User
                </th>

                <th className="p-5 text-left font-semibold">
                  Email
                </th>

                <th className="p-5 text-left font-semibold">
                  Role
                </th>

                <th className="p-5 text-left font-semibold">
                  Status
                </th>

                <th className="p-5 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-200 transition hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold text-slate-900">
                    {user.name}
                  </td>

                  <td className="p-5 text-slate-700">
                    {user.email}
                  </td>

                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        user.role ===
                        "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role ===
                            "Freelancer"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-5">
                    {user.isBlocked ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                        Blocked
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() =>
                        toggleBlock(
                          user._id,
                          user.isBlocked
                        )
                      }
                      className={`rounded-xl px-5 py-2 font-semibold text-white shadow-lg transition-all hover:scale-105 ${
                        user.isBlocked
                          ? "bg-gradient-to-r from-green-500 to-emerald-600"
                          : "bg-gradient-to-r from-red-500 to-pink-600"
                      }`}
                    >
                      {user.isBlocked
                        ? "Unblock"
                        : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-16 text-center">
              <div className="text-6xl">
                👥
              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                No Users Found
              </h3>

              <p className="mt-2 text-slate-500">
                Users will appear here
                once registered.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}