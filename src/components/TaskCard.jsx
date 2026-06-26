import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-blue-500/50 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
          {task.category}
        </span>

        <span className="font-bold text-green-400">
          ${task.budget}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-white">
        {task.title}
      </h3>

      <p className="mt-3 text-slate-400 line-clamp-3">
        {task.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">
            Deadline
          </p>

          <p className="text-sm text-white">
            {task.deadline}
          </p>
        </div>

        <Link
          href={`/tasks/${task._id}`}
          className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Details
        </Link>
      </div>
    </div>
  );
}