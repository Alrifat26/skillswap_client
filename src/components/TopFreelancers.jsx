export default async function TopFreelancers() {
  const res = await fetch(
    "http://localhost:3000/api/freelancers",
    {
      cache: "no-store",
    }
  );

  const freelancers = await res.json();

  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Top Talent
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-white">
            Top Freelancers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Work with highly rated professionals trusted by clients.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {freelancers.map((freelancer) => (
            <div
              key={freelancer._id}
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>

              <div className="relative flex flex-col items-center text-center">
                <img
                  src={
                    freelancer.image ||
                    "https://i.pravatar.cc/300"
                  }
                  alt={freelancer.name}
                  className="h-28 w-28 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                />

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {freelancer.name}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {freelancer.email}
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {freelancer.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid w-full grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-800/80 p-4">
                    <p className="text-2xl font-bold text-yellow-400">
                      ⭐ {freelancer.rating || 5}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                      Rating
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-800/80 p-4">
                    <p className="text-2xl font-bold text-green-400">
                      {freelancer.completedJobs || 0}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                      Jobs Done
                    </p>
                  </div>
                </div>

                <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white transition hover:scale-105">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}