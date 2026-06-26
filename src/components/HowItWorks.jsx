import {
  SquarePlus,
  Persons,
  Rocket,
} from "@gravity-ui/icons";
export default function HowItWorks() {
  const steps = [
    {
      icon: SquarePlus,
      title: "Post a Task",
      description:
        "Clients create tasks with budget, category and deadline.",
    },
    {
      icon: Persons,
      title: "Get Proposals",
      description:
        "Freelancers submit proposals and compete for your project.",
    },
    {
      icon: Rocket,
      title: "Hire & Pay",
      description:
        "Choose the best freelancer and complete payment securely.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            How SkillSwap Works
          </h2>

          <p className="mt-4 text-slate-400">
            Complete your projects in three simple steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500 hover:-translate-y-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                <step.icon className="h-8 w-8 text-blue-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {step.description}
              </p>

              <div className="mt-6 text-sm font-semibold text-blue-400">
                Step {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}