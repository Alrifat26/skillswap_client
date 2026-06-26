"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client"; // আপনার auth-client পাথ অনুযায়ী
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  Bars,
  Xmark,
  House,
  GraduationCap,
  Persons,
  LayoutSideContent,
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    router.push("/auth/signin"); // লগআউট হলে সাইন-ইন পেজে রিডাইরেক্ট করবে
  };

  // ইউজারের রোল অনুযায়ী ড্যাশবোর্ড ইউআরএল নির্ধারণ (Fix: Case-insensitive Check)
  const getDashboardPath = () => {
    if (!session?.user || !session.user.role) return "/dashboard";
    
    const role = session.user.role.toLowerCase(); // ছোট হাতের অক্ষরে কনভার্ট করে নেওয়া হলো
    
    if (role === "client") return "/dashboard/client";
    if (role === "freelancer") return "/dashboard/freelancer";
    if (role === "admin") return "/dashboard/admin";
    
    return "/dashboard";
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: House,
    },
    {
      name: "Browse Skills",
      href: "/#popular-categories",
      icon: GraduationCap,
    },
    {
      name: "Find Freelancers",
      href: "/freelancers",
      icon: Persons,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Skill<span className="text-indigo-600">Swap</span>
            </h1>
            <p className="-mt-1 text-xs text-slate-500">
              Learn • Teach • Grow
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-slate-600 transition-all duration-200 hover:text-indigo-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side - Dynamic Auth States */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            // সেশন লোড হওয়ার সময় অ্যানিমেটেড প্লেসহোল্ডার
            <div className="h-10 w-24 bg-slate-100 animate-pulse rounded-xl"></div>
          ) : session?.user ? (
            // ১. ইউজার লগইন থাকলে নাম, নির্দিষ্ট ড্যাশবোর্ড এবং লগআউট বাটন দেখাবে
            <>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                Hi, {session.user.name}
              </span>

              <Link href={getDashboardPath()}>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<LayoutSideContent />}
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </Link>

              <Button
                color="danger"
                variant="light"
                onClick={handleLogout}
                className="font-medium"
              >
                Logout
              </Button>
            </>
          ) : (
            // ২. ইউজার লগইন না থাকলে সাইন-ইন এবং সাইন-আপ বাটন দেখাবে
            <>
              <Link href="/auth/signin">
                <Button variant="light" className="font-medium text-slate-700">
                  Login
                </Button>
              </Link>

              <Link href="/auth/signup">
                <Button color="primary" className="font-medium">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-2 p-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}

            <div className="mt-4 border-t border-slate-200 pt-4 space-y-2">
              {isPending ? (
                <div className="h-10 w-full bg-slate-50 animate-pulse rounded-xl"></div>
              ) : session?.user ? (
                // মোবাইল সেশনে লগইন থাকলে
                <>
                  <div className="text-center text-sm font-semibold text-emerald-600 bg-emerald-50 py-2.5 rounded-xl mb-2">
                    Hi, {session.user.name}
                  </div>

                  <Link href={getDashboardPath()} className="block w-full">
                    <Button
                      color="primary"
                      variant="flat"
                      className="w-full"
                      onPress={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    color="danger"
                    variant="light"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                // মোবাইল সেশনে লগইন না থাকলে
                <>
                  <Link href="/auth/signin" className="block w-full">
                    <Button
                      variant="light"
                      className="w-full"
                      onPress={() => setIsOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/auth/signup" className="block w-full">
                    <Button
                      color="primary"
                      className="w-full"
                      onPress={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}