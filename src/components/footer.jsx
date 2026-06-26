import Link from "next/link";
import { GraduationCap } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-md">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Skill<span className="text-indigo-600">Swap</span>
                </h2>

                <p className="-mt-1 text-xs text-slate-500">
                  Learn • Teach • Grow
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
              Connect with learners, exchange knowledge, and unlock new
              opportunities through skill sharing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-semibold text-slate-900">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-indigo-600">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/skills" className="hover:text-indigo-600">
                  Browse Skills
                </Link>
              </li>

              <li>
                <Link href="/partners" className="hover:text-indigo-600">
                  Find Freelancers
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="hover:text-indigo-600">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-slate-900">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>support@skillswap.com</li>
              <li>Dhaka, Bangladesh</li>
              <li>Available 24/7</li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-5 font-semibold text-slate-900">
              Community
            </h3>

            <div className="flex gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600">
                X
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600">
                f
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600">
                in
              </button>

              
              
            </div>

            <p className="mt-5 text-sm text-slate-600">
              Join our growing learning community.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-200" />

       
        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} SkillSwap. All rights reserved.
            </p>

            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-indigo-600">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-indigo-600">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}