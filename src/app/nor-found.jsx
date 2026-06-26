import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[150px]" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-2xl backdrop-blur-xl">

        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-orange-500/10">
          <span className="text-7xl">🚀</span>
        </div>

        <h1 className="mt-8 bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-4xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
          The page you're looking for doesn't exist, may have been moved,
          or the URL might be incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            🏠 Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            ← Go Back
          </button>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6">

          <p className="text-sm text-slate-500">
            SkillSwap © 2026 • Find Talent • Build Careers
          </p>

        </div>

      </div>

    </section>
  );
}