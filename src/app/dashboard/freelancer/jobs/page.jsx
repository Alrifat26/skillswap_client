"use client";

import { useEffect, useState } from "react";

export default function MyJobsPage() {
const [jobs, setJobs] = useState([]);

useEffect(() => {
loadJobs();
}, []);

const loadJobs = async () => {
try {
const res = await fetch("/api/proposals");


  const data = await res.json();

  const acceptedJobs = data.filter(
    (item) => item.status === "accepted"
  );

  setJobs(acceptedJobs);
} catch (error) {
  console.error(error);
}


};

return ( <div className="space-y-8"> <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-8 text-white shadow-xl"> <h1 className="text-4xl font-bold">
My Jobs </h1>


    <p className="mt-3 text-orange-100">
      Jobs that have been assigned to you.
    </p>
  </div>

  <div className="grid gap-6">
    {jobs.length > 0 ? (
      jobs.map((job) => (
        <div
          key={job._id}
          className="rounded-3xl bg-white p-6 shadow-lg"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {job.taskTitle}
              </h2>

              <p className="mt-2 text-slate-600">
                Client Project
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Budget
              </p>

              <h3 className="text-3xl font-bold text-green-600">
                ${job.bidAmount}
              </h3>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-100 p-4">
            <p className="text-slate-700">
              {job.coverLetter}
            </p>
          </div>

          <div className="mt-5">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Accepted
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <span className="text-3xl">💼</span>
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">
          No Jobs Yet
        </h3>

        <p className="mt-2 text-slate-500">
          Accepted jobs will appear here.
        </p>
      </div>
    )}
  </div>
</div>


);
}
