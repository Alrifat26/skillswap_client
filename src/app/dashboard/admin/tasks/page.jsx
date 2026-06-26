"use client";

import { useEffect, useState } from "react";

export default function AdminTasksPage() {
const [tasks, setTasks] = useState([]);
const [filteredTasks, setFilteredTasks] = useState([]);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [status, setStatus] = useState("all");

useEffect(() => {
loadTasks();
}, []);

useEffect(() => {
filterTasks();
}, [tasks, search, category, status]);

const loadTasks = async () => {
try {
const res = await fetch("/api/tasks");
const data = await res.json();


  setTasks(data);
  setFilteredTasks(data);
} catch (error) {
  console.error(error);
}


};

const filterTasks = () => {
let filtered = [...tasks];


if (search) {
  filtered = filtered.filter((task) =>
    task.title?.toLowerCase().includes(search.toLowerCase())
  );
}

if (category !== "all") {
  filtered = filtered.filter(
    (task) =>
      task.category?.toLowerCase() === category.toLowerCase()
  );
}

if (status !== "all") {
  filtered = filtered.filter(
    (task) =>
      (task.status || "open").toLowerCase() ===
      status.toLowerCase()
  );
}

setFilteredTasks(filtered);


};

const deleteTask = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this task?"
);


if (!confirmDelete) return;

try {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    loadTasks();
  }
} catch (error) {
  console.error(error);
}


};

return ( <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-8">
{/* Hero */} <div className="mb-8 rounded-[32px] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-2xl"> <div className="flex items-center justify-between"> <div> <h1 className="text-5xl font-black">
Task Management </h1>


        <p className="mt-3 text-lg text-blue-100">
          Monitor and manage all tasks across the platform.
        </p>
      </div>

      <div className="hidden lg:block text-8xl">
        📋
      </div>
    </div>
  </div>

  {/* Stats */}
  <div className="mb-8 grid gap-6 md:grid-cols-4">
    <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-2xl">
      <p>Total Tasks</p>

      <h2 className="mt-3 text-5xl font-black">
        {filteredTasks.length}
      </h2>
    </div>

    <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 p-6 text-white shadow-2xl">
      <p>Open Tasks</p>

      <h2 className="mt-3 text-5xl font-black">
        {
          filteredTasks.filter(
            (task) =>
              (task.status || "open") === "open"
          ).length
        }
      </h2>
    </div>

    <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-2xl">
      <p>In Progress</p>

      <h2 className="mt-3 text-5xl font-black">
        {
          filteredTasks.filter(
            (task) =>
              task.status === "in-progress"
          ).length
        }
      </h2>
    </div>

    <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 p-6 text-white shadow-2xl">
      <p>Total Budget</p>

      <h2 className="mt-3 text-4xl font-black">
        $
        {filteredTasks.reduce(
          (sum, task) =>
            sum + Number(task.budget || 0),
          0
        )}
      </h2>
    </div>
  </div>

  {/* Filters */}
  <div className="mb-8 flex flex-wrap gap-4">
    <input
      type="text"
      placeholder="Search task..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-lg outline-none focus:border-blue-500"
    />

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
      className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-lg"
    >
      <option value="all">All Categories</option>
      <option value="development">
        Development
      </option>
      <option value="design">
        Design
      </option>
      <option value="writing">
        Writing
      </option>
      <option value="marketing">
        Marketing
      </option>
      <option value="other">
        Other
      </option>
    </select>

    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-lg"
    >
      <option value="all">All Status</option>
      <option value="open">Open</option>
      <option value="in-progress">
        In Progress
      </option>
      <option value="completed">
        Completed
      </option>
    </select>
  </div>

  {/* Table */}
  <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
    <div className="border-b bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-white">
        Platform Tasks
      </h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-5 text-left">
              Title
            </th>

            <th className="p-5 text-left">
              Category
            </th>

            <th className="p-5 text-left">
              Client
            </th>

            <th className="p-5 text-left">
              Budget
            </th>

            <th className="p-5 text-left">
              Status
            </th>

            <th className="p-5 text-left">
              Created
            </th>

            <th className="p-5 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task._id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-5 font-semibold text-slate-900">
                {task.title}
              </td>

              <td className="p-5">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    task.category === "Development"
                      ? "bg-blue-100 text-blue-700"
                      : task.category === "Design"
                      ? "bg-pink-100 text-pink-700"
                      : task.category === "Writing"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {task.category}
                </span>
              </td>

              <td className="p-5 text-slate-700">
                {task.clientEmail ||
                  task.email ||
                  "-"}
              </td>

              <td className="p-5 font-bold text-emerald-600">
                ${task.budget}
              </td>

              <td className="p-5">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status ===
                        "in-progress"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {task.status || "open"}
                </span>
              </td>

              <td className="p-5 text-slate-600">
                {task.createdAt
                  ? new Date(
                      task.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-5 text-right">
                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="rounded-xl bg-gradient-to-r from-red-500 to-pink-600 px-5 py-2 font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTasks.length === 0 && (
        <div className="p-16 text-center">
          <div className="text-7xl">
            📋
          </div>

          <h3 className="mt-4 text-3xl font-bold text-slate-800">
            No Tasks Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try changing your filters.
          </p>
        </div>
      )}
    </div>
  </div>
</div>


);
}
