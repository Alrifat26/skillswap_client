export default async function FeaturedTasks() {
  const res = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });

  const tasks = await res.json();

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white">
            Latest Featured Tasks
          </h2>

          <p className="mt-3 text-slate-400">
            Find the latest freelance opportunities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.slice(0, 6).map((task) => (
            <div
              key={task._id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
            >
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                {task.category}
              </span>

              <h3 className="mt-4 text-xl font-bold text-white">
                {task.title}
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                {task.description}
              </p>

              <div className="mt-6 space-y-2">
                <p className="text-slate-300">
                  👤 {task.client_name}
                </p>

                <p className="text-green-400">
                  💰 ${task.budget}
                </p>

                <p className="text-slate-400">
                  📅 {task.deadline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}