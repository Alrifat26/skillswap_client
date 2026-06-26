"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
} from "@gravity-ui/icons";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/pic/gg.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100vh] items-center justify-center px-6">
        <div className="w-full max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            The modern skill-sharing platform
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl lg:text-8xl">
            Learn new skills
            <br />
            from{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
              talented people
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            SkillSwap connects learners and mentors. Exchange knowledge,
            teach what you know, and discover new opportunities together.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/skills">
              <Button
                size="lg"
                color="primary"
                endContent={<ArrowRight />}
                className="h-14 px-8 text-base font-semibold shadow-xl"
              >
                Explore Skills
              </Button>
            </Link>

            <Link href="/partners">
              <Button
                size="lg"
                variant="bordered"
                className="h-14 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md"
              >
                Find Freelancers
              </Button>
            </Link>
          </div>

          {/* Stats
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/20 pt-10">
            <div>
              <h3 className="text-4xl font-bold text-white">
                5K+
              </h3>
              <p className="mt-2 text-slate-300">
                Learners
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                1.2K+
              </h3>
              <p className="mt-2 text-slate-300">
                Skills Shared
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                98%
              </h3>
              <p className="mt-2 text-slate-300">
                Success Rate
              </p>
            </div>
          </div> */}

          {/* Feature Card */}
          <div className="mx-auto mt-16 hidden max-w-xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md lg:block">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20">
                <GraduationCap className="h-7 w-7 text-indigo-300" />
              </div>

              <div className="text-left">
                <h4 className="font-semibold text-white">
                  Start Learning Today
                </h4>

                <p className="text-sm text-slate-300">
                  Connect with experts and grow your skills faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}