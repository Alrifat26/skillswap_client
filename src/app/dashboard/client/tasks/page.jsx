"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadTasks();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 text-black">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-400 p-8 text-white">
          <h1 className="text-4xl font-bold">
            My Tasks
          </h1>

          <p className="mt-2 text-orange-100">
            Manage all your posted tasks
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">
                  Task ID
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Budget
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-mono text-xs">
                    {task._id}
                  </td>

                  <td className="p-4 font-semibold">
                    {task.title}
                  </td>

                  <td className="p-4">
                    {task.category}
                  </td>

                  <td className="p-4">
                    ${task.budget}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-4 flex flex-wrap gap-2">

                    <Link
                      href={`/dashboard/client/tasks/${task._id}`}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(task._id)
                      }
                      className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>

                    <Link
                    href={`/dashboard/client/applicants/${task._id}`}
                      className="rounded-lg bg-green-600 px-4 py-2 text-white"
                    >
                     Applicants
                    </Link>

                    {task.status === "Completed" && (
                      <Link
                        href={`/dashboard/client/reviews?taskId=${task._id}`}
                        className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                      >
                        Leave Review ⭐
                      </Link>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}