export default function PopularCategories() {
  const categories = [
    {
      emoji: "🎨",
      title: "Design",
      jobs: "120+ Tasks",
    },
    {
      emoji: "💻",
      title: "Development",
      jobs: "240+ Tasks",
    },
    {
      emoji: "✍️",
      title: "Writing",
      jobs: "95+ Tasks",
    },
    {
      emoji: "📈",
      title: "Marketing",
      jobs: "80+ Tasks",
    },
    {
      emoji: "📱",
      title: "Mobile Apps",
      jobs: "60+ Tasks",
    },
    {
      emoji: "🤖",
      title: "AI Services",
      jobs: "45+ Tasks",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400">
            Explore Categories
          </span>
          <section
          id="popular-categories"
            className="relative overflow-hidden bg-slate-950 py-24"
          ></section>
          <h2 className="mt-6 text-4xl font-extrabold">
            Popular Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Discover the most active categories where clients and freelancers
            collaborate every day.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50"
            >
              <div className="text-5xl">
                {category.emoji}
              </div>

              <h3 className="mt-5 text-2xl font-bold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-slate-400">
                {category.jobs}
              </p>

              <div className="mt-6 text-sm font-medium text-indigo-400">
                Browse Category →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}