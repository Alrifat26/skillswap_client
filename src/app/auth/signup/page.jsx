"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { signUp } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  // রিকোয়ারমেন্টের সাথে ম্যাচ রাখার জন্য ডিফল্ট রোল 'Freelancer' করা হলো
  const [role, setRole] = useState("Freelancer"); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
      role: role, // 'Freelancer' অথবা 'Client'
    };

    // পাসওয়ার্ড ম্যাচিং চেক
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // ✅ Better-Auth ফিক্স: কাস্টম রোল (role) সরাসরি রুট লেভেলে অবজেক্টের ভেতর পাস করা হলো
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role, // Better-Auth কনফিগারেশনের additionalFields-এর সাথে এটি সরাসরি ম্যাপ হবে
      });

      if (result?.data) {
        setSuccess(true);
        e.target.reset(); // ফর্মের ইনপুট খালি করার জন্য

        // সফলভাবে সাইন-আপ হলে ১.৫ সেকেন্ড মেসেজটি দেখিয়ে সঠিক ড্যাশবোর্ডে রিডাইরেক্ট করবে
        setTimeout(() => {
          setSuccess(false);
          if (data.role === "Freelancer") {
            router.push("/dashboard/freelancer");
          } else {
            router.push("/"); // Client হলে হোমপেজে চলে যাবে
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020617] relative overflow-hidden">
      
      {/* সফলভাবে সাইন-আপ হলে কনফার্মেশন নোটিফিকেশন পপ-আপ */}
      {success && (
        <div className="fixed top-6 right-6 z-[9999] animate-bounce">
          <div className="rounded-2xl border border-green-500/30 bg-green-600 px-6 py-4 text-white shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Account Created Successfully</p>
                <p className="text-sm text-green-100">Welcome to SkillSwap 🚀</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Glows */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Side Info */}
          <div className="hidden lg:block">
            <span className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm">
              Freelance Marketplace
            </span>
            <h1 className="mt-8 text-6xl font-extrabold text-white leading-tight">
              Turn Skills Into <span className="block text-blue-500">Real Income</span>
            </h1>
            <p className="mt-6 text-slate-400 text-lg max-w-xl">
              Join SkillSwap and connect with clients and freelancers worldwide. Earn money, hire talent, and build your future.
            </p>
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-green-400">✓</span> Secure Payments
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-green-400">✓</span> Verified Freelancers
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-green-400">✓</span> Fast Project Delivery
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-4xl font-bold text-white">Create Account</h2>
            <p className="text-slate-400 mt-2">Join SkillSwap and start your journey today.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-400 text-sm hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-slate-400 text-sm hover:text-white"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Role Selection */}
              <div>
                <p className="text-slate-400 mb-3 text-sm">Select Role</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("Freelancer")}
                    className={`rounded-xl p-4 border text-left transition ${
                      role === "Freelancer" ? "border-blue-500 bg-blue-500/10" : "border-white/10"
                    }`}
                  >
                    <h4 className="text-white font-semibold">Freelancer 🧑🏼‍💻 </h4>
                    <p className="text-xs text-slate-400 mt-1">Find work & earn</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("Client")}
                    className={`rounded-xl p-4 border text-left transition ${
                      role === "Client" ? "border-blue-500 bg-blue-500/10" : "border-white/10"
                    }`}
                  >
                    <h4 className="text-white font-semibold">Client 🧑🏼‍💼</h4>
                    <p className="text-xs text-slate-400 mt-1">Hire freelancers</p>
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer select-none">
                <input type="checkbox" required className="accent-blue-500" />
                I agree to the Terms & Conditions
              </label>

              <Button
                type="submit"
                color="primary"
                className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                isLoading={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="flex items-center gap-4">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-slate-500 text-xs">OR</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <button
                type="button"
                className="w-full rounded-xl border border-white/10 py-3 text-white hover:bg-white/5 transition font-medium"
              >
                Continue with Google
              </button>
            </form>

            <p className="text-center text-slate-400 mt-6 text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign In 👈🏼
              </Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}