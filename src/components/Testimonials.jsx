export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Wilson",
      role: "Freelancer",
      review:
        "SkillSwap helped me land my first freelance project within a week. The platform is simple and effective.",
    },
    {
      name: "John Carter",
      role: "Client",
      review:
        "Found a talented React developer in just a few hours. Great experience and smooth workflow.",
    },
    {
      name: "Emma Brown",
      role: "Freelancer",
      review:
        "The proposal system is straightforward and the project management flow is excellent.",
    },
  ];

  return (
    <section className="bg-[#020617] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">
            What People Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Trusted by freelancers and clients worldwide.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4 text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-slate-300">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h4 className="font-semibold text-white">
                  {item.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}