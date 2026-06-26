export default async function PlatformStats() {
  const baseUrl =
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

const res = await fetch(`${baseUrl}/api/stats`, {
  cache: "no-store",
});

  const stats = await res.json();

  const items = [
    {
      title: "Active Users",
      value: stats.totalUsers || 0,
      color: "text-white",
    },
    {
      title: "Tasks Posted",
      value: stats.totalTasks || 0,
      color: "text-blue-400",
    },
    {
      title: "Freelancers",
      value: stats.totalFreelancers || 0,
      color: "text-cyan-400",
    },
    {
      title: "Open Tasks",
      value: stats.openTasks || 0,
      color: "text-green-400",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#020617] py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Platform Growth
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">
            Trusted by Thousands
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            SkillSwap is growing every day with talented freelancers and
            clients from around the world.
          </p>
        </div>

        {/* Stats Card */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="group text-center"
              >
                <h3
                  className={`text-5xl font-extrabold transition-transform duration-300 group-hover:scale-110 md:text-6xl ${item.color}`}
                >
                  {item.value}+
                </h3>

                <p className="mt-3 text-sm font-medium text-slate-400 md:text-base">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Text */}
        <div className="mt-10 text-center">
          <p className="text-slate-500">
            Helping freelancers and clients collaborate faster, safer,
            and smarter.
          </p>
        </div>
      </div>
    </section>
  );
}