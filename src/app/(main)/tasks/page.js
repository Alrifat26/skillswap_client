"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";

export default function TasksPage() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

const [currentPage, setCurrentPage] = useState(1);

const tasksPerPage = 9;

useEffect(() => {
const fetchTasks = async () => {
setLoading(true);


  const res = await fetch(
    `/api/tasks?search=${search}&category=${category}`
  );

  const data = await res.json();

  setTasks(data);
  setLoading(false);
};

fetchTasks();


}, [search, category]);

const indexOfLastTask =
currentPage * tasksPerPage;

const indexOfFirstTask =
indexOfLastTask - tasksPerPage;

const currentTasks = tasks.slice(
indexOfFirstTask,
indexOfLastTask
);

const totalPages = Math.ceil(
tasks.length / tasksPerPage
);

return ( <section className="min-h-screen bg-[#020617] py-20"> <div className="mx-auto max-w-7xl px-6">
{/* Header */} <div className="text-center"> <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
Browse Tasks </span>


      <h1 className="mt-6 text-5xl font-extrabold text-white">
        Available Freelance Tasks
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-slate-400">
        Find freelance opportunities and start earning.
      </p>
    </div>

    {/* Search + Filter */}
    <div className="mt-12 flex flex-col gap-4 md:flex-row">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none focus:border-blue-500"
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCurrentPage(1);
        }}
        className="rounded-2xl border border-white/10 bg-[#0f172a] px-5 py-3 text-white outline-none focus:border-blue-500"
      >
        <option>All</option>
        <option>Design</option>
        <option>Writing</option>
        <option>Development</option>
        <option>Marketing</option>
        <option>Other</option>
      </select>
    </div>

    {/* Results */}
    {loading ? (
      <div className="mt-12 text-center text-slate-400">
        Loading...
      </div>
    ) : tasks.length === 0 ? (
      <div className="mt-12 text-center text-slate-400">
        No tasks found.
      </div>
    ) : (
      <>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {[...Array(totalPages)].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                  className={`h-12 w-12 rounded-xl font-bold transition ${
                    currentPage ===
                    index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </>
    )}
  </div>
</section>


);
}
