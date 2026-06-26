"use client";

import { useEffect, useState } from "react";

export default function AvailableTasksPage() {
const [tasks, setTasks] = useState([]);
const [selectedTask, setSelectedTask] = useState(null);
const [bidAmount, setBidAmount] = useState("");
const [coverLetter, setCoverLetter] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
loadTasks();
}, []);

const loadTasks = async () => {
try {
const res = await fetch("/api/tasks");
const data = await res.json();
setTasks(data);
} catch (error) {
console.error(error);
}
};

const handleProposalSubmit = async () => {
if (!bidAmount || !coverLetter) {
window.alert("Please fill all fields");
return;
}


try {
  setLoading(true);

  const proposal = {
    taskId: selectedTask._id,
    taskTitle: selectedTask.title,
    freelancerName: "Freelancer User",
    freelancerEmail: "freelancer@email.com",
    bidAmount: Number(bidAmount),
    coverLetter,
    status: "pending",
    createdAt: new Date(),
  };

  const res = await fetch("/api/proposals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proposal),
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  window.alert("Proposal Submitted Successfully 🎉");

  setSelectedTask(null);
  setBidAmount("");
  setCoverLetter("");
} catch (error) {
  console.error(error);
  window.alert("Something went wrong");
} finally {
  setLoading(false);
}


};

return ( <div>
{/* Header */} <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-8 text-white shadow-xl"> <h1 className="text-4xl font-bold">
Available Tasks </h1>


    <p className="mt-3 text-orange-100">
      Find projects and start earning today.
    </p>
  </div>

  {/* Tasks */}
  <div className="mt-8 grid gap-6 lg:grid-cols-2">
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <div
          key={task._id}
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
              {task.category}
            </span>

            <span className="font-bold text-green-600">
              ${task.budget}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            {task.title}
          </h2>

          <p className="mt-3 text-slate-500">
            {task.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Client
              </p>

              <p className="font-medium text-slate-900">
                {task.client_name || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Deadline
              </p>

              <p className="font-medium text-slate-900">
                {task.deadline || "Not Set"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedTask(task)}
            className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            Submit Proposal
          </button>
        </div>
      ))
    ) : (
      <div className="col-span-full rounded-3xl bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <span className="text-3xl">📋</span>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          No Tasks Available
        </h2>

        <p className="mt-2 text-slate-500">
          New opportunities will appear here.
        </p>
      </div>
    )}
  </div>

  {/* Modal */}
  {selectedTask && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-slate-900">
          Submit Proposal
        </h2>

        <p className="mt-2 text-slate-500">
          {selectedTask.title}
        </p>

        <input
          type="number"
          placeholder="Your Bid Amount"
          value={bidAmount}
          onChange={(e) =>
            setBidAmount(e.target.value)
          }
          className="mt-6 w-full rounded-xl border p-3 text-black"
        />

        <textarea
          rows="5"
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) =>
            setCoverLetter(e.target.value)
          }
          className="mt-4 w-full rounded-xl border p-3 text-black"
        />

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setSelectedTask(null)}
            className="flex-1 rounded-xl border py-3 font-medium text-black"
          >
            Cancel
          </button>

          <button
            onClick={handleProposalSubmit}
            disabled={loading}
            className="flex-1 rounded-xl bg-orange-500 py-3 font-medium text-white"
          >
            {loading
              ? "Submitting..."
              : "Submit Proposal"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>


);
}
