"use client";

import { useEffect, useState } from "react";

export default function AcceptedJobsPage() {
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

const completeProject = async (taskId) => {
try {
console.log("TASK ID:", taskId);


const res = await fetch(`/api/tasks/${taskId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "completed",
  }),
});

const data = await res.json();

console.log("PATCH RESPONSE:", data);

if (res.ok) {
  alert("Project marked as completed 🎉");
  loadJobs();
} else {
  alert("Failed to update task");
}


} catch (error) {
console.error(error);
}
};


return ( <div> <div className="rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-white shadow-xl"> <h1 className="text-4xl font-bold">
Accepted Jobs </h1>


    <p className="mt-3 text-green-100">
      Manage your active projects and complete them.
    </p>
  </div>

  <div className="mt-8 grid gap-6">
    {jobs.length > 0 ? (
      jobs.map((job) => (
        <div
          key={job._id}
          className="rounded-3xl bg-white p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-slate-900">
            {job.taskTitle}
          </h2>

          <p className="mt-3 text-slate-600">
            Bid Amount:
            <span className="ml-2 font-bold text-green-600">
              ${job.bidAmount}
            </span>
          </p>

          <div className="mt-5 rounded-2xl bg-slate-100 p-4">
            <p className="text-slate-700">
              {job.coverLetter}
            </p>
          </div>

          <button
            onClick={() =>
              completeProject(job.taskId)
            }
            className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-medium text-white hover:bg-green-600"
          >
            Mark As Completed
          </button>
        </div>
      ))
    ) : (
      <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">✅</span>
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">
          No Accepted Jobs
        </h3>

        <p className="mt-2 text-slate-500">
          Accepted projects will appear here.
        </p>
      </div>
    )}
  </div>
</div>


);
}
