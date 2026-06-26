"use client";

import { useState } from "react";
import { signIn } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // ===========================
  // Email Login
  // ===========================

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { data, error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Login Failed");
        setLoading(false);
        return;
      }

      console.log("Login Success:", data);

      const role =
        data?.user?.role ||
        data?.user?.additionalFields?.role;

      console.log("User Role:", role);

      setSuccessMessage(
        "🎉 Welcome back to SkillSwap! Redirecting..."
      );

      setTimeout(() => {
        if (role === "Freelancer") {
          router.replace("/dashboard/freelancer");
        } else if (role === "Client") {
          router.replace("/dashboard/client");
        } else if (role === "Admin") {
          router.replace("/dashboard/admin");
        } else {
          router.replace("/");
        }

        router.refresh();
      }, 1200);
    } catch (err) {
      console.error(err);

      setError("Server Error");

      setLoading(false);
    }
  };

  // ===========================
  // Google Login
  // ===========================

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-4">
      <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-xl border border-slate-800">

        <h2 className="text-2xl font-bold text-center mb-2">
          Login to SkillSwap
        </h2>

        <p className="text-sm text-slate-400 text-center mb-6">
          Start your journey and swap your skills today
        </p>

        {successMessage && (
          <div className="mb-4 rounded border border-green-500 bg-green-500/10 p-3 text-sm text-green-400">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded border border-red-500 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleEmailLogin}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded border border-slate-700 bg-slate-900 p-3 outline-none focus:border-blue-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded border border-slate-700 bg-slate-900 p-3 outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-70"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        <div className="my-6 text-center text-slate-500">
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full rounded border border-slate-700 bg-white py-3 font-semibold text-black hover:bg-slate-100"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400 hover:underline"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}

