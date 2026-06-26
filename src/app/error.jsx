"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl shadow-2xl">

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-500/10">
          <span className="text-6xl">⚠️</span>
        </div>

        <h1 className="mt-8 text-5xl font-extrabold text-white">
          Something went wrong
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-slate-400">
          We couldn't complete your request.
          An unexpected error occurred while processing your action.
          Please try again or return to the homepage.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            onClick={() => reset()}
            className="rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-orange-600"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white/10"
          >
            Back Home
          </Link>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6">

          <p className="text-sm text-slate-500">
            SkillSwap © 2026 • Reliable Freelance Marketplace
          </p>

        </div>

      </div>

    </section>
  );
}