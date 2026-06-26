"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  const loadCompletedTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();

      const completedTasks = data.filter(
        (task) => task.status === "completed"
      );

      setTasks(completedTasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 text-black">
      <div className="mx-auto max-w-7xl">
        
       
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 sm:p-8 text-white shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-black">
            Completed Tasks ✅
          </h1>

          <p className="mt-2 text-sm sm:text-base text-green-100">
            Successfully completed projects and freelancer reviews
          </p>
        </div>

        {loading ? (
          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-10 text-center shadow-lg font-semibold">
            Loading...
          </div>
        ) : tasks.length === 0 ? (
          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white p-10 text-center shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
              No Completed Tasks Found
            </h2>
          </div>
        ) : (
          
          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-lg flex flex-col justify-between border border-slate-100"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {task.title}
                    </h2> 

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs sm:text-sm font-bold text-green-600 shrink-0">
                      Completed
                    </span>
                  </div>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 break-words">
                    {task.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm sm:text-base">
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      {task.category}
                    </p>

                    <p>
                      <span className="font-semibold">Budget:</span>{" "}
                      ${task.budget}
                    </p>

                    <p>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {task.deadline}
                    </p>

                    {task.deliverable_url && (
                      <a
                        href={task.deliverable_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-blue-600 hover:underline text-sm font-medium"
                      >
                        View Deliverable 🔗
                      </a>
                    )}
                  </div>
                </div>

                <Link
                  href={`/dashboard/client/reviews?taskId=${task._id}`}
                  className="mt-6 block w-full rounded-xl bg-orange-500 py-3 text-center font-bold text-white transition hover:bg-orange-600 shadow-md text-sm sm:text-base"
                >
                  Leave Review ⭐
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}