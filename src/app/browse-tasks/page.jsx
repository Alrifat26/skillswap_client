"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BrowseTasksPage() {
const [tasks, setTasks] =
useState([]);

const [loading, setLoading] =
useState(true);

const [page, setPage] =
useState(1);

const [totalPages, setTotalPages] =
useState(1);

const [search, setSearch] =
useState("");

const [category, setCategory] =
useState("all");

useEffect(() => {
loadTasks();
}, [page, search, category]);

const loadTasks = async () => {
try {
setLoading(true);


  const res = await fetch(
    `NEXT_PUBLIC_URL/api/tasks?page=${page}&limit=9&search=${search}&category=${category}`
  );

  const data =
    await res.json();

  setTasks(data.tasks || []);

  setTotalPages(
    data.totalPages || 1
  );
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-slate-100 p-8"> <div className="mx-auto max-w-7xl">
{/* Hero */} <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-8 text-white shadow-xl"> <h1 className="text-5xl font-black">
Browse Tasks 🚀 </h1>


      <p className="mt-3 text-orange-100">
        Discover freelance opportunities
        and submit proposals.
      </p>
    </div>

    {/* Search + Filter */}
    <div className="mt-8 flex flex-col gap-4 md:flex-row">
      <input
        type="text"
        placeholder="Search task title..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(
            e.target.value
          );
        }}
        className="flex-1 rounded-2xl border bg-white px-5 py-4 shadow-sm outline-none"
      />

      <select
        value={category}
        onChange={(e) => {
          setPage(1);
          setCategory(
            e.target.value
          );
        }}
        className="rounded-2xl border bg-white px-5 py-4 shadow-sm"
      >
        <option value="all">
          All Categories
        </option>

        <option value="Design">
          Design
        </option>

        <option value="Writing">
          Writing
        </option>

        <option value="Development">
          Development
        </option>

        <option value="Marketing">
          Marketing
        </option>

        <option value="Other">
          Other
        </option>
      </select>
    </div>

    {/* Tasks */}
    {loading ? (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading...
      </div>
    ) : tasks.length === 0 ? (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
        <h2 className="text-2xl font-bold">
          No Tasks Found
        </h2>
      </div>
    ) : (
      <>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-slate-900">
                {task.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {
                  task.description
                }
              </p>

              <div className="mt-5 space-y-2">
                <p>
                  <span className="font-semibold">
                    Category:
                  </span>{" "}
                  {
                    task.category
                  }
                </p>

                <p>
                  <span className="font-semibold">
                    Budget:
                  </span>{" "}
                  $
                  {
                    task.budget
                  }
                </p>

                <p>
                  <span className="font-semibold">
                    Deadline:
                  </span>{" "}
                  {
                    task.deadline
                  }
                </p>
              </div>

              <Link
                href={`/tasks/${task._id}`}
                className="mt-6 block rounded-xl bg-orange-500 py-3 text-center font-bold text-white transition hover:bg-orange-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={
              page === 1
            }
            onClick={() =>
              setPage(
                page - 1
              )
            }
            className="rounded-xl bg-slate-800 px-6 py-3 font-bold text-white disabled:opacity-40"
          >
            Previous
          </button>

          <span className="rounded-xl bg-white px-6 py-3 font-bold shadow">
            Page {page} of{" "}
            {totalPages}
          </span>

          <button
            disabled={
              page ===
              totalPages
            }
            onClick={() =>
              setPage(
                page + 1
              )
            }
            className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </>
    )}
  </div>
</div>


);
}
