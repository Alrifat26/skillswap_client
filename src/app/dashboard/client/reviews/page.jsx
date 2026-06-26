"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";


function ReviewsPageContent() {
  const searchParams = useSearchParams();

  const taskId = searchParams.get("taskId") || "";
  const freelancerEmail = searchParams.get("freelancerEmail") || "";

  const [formData, setFormData] = useState({
    task_id: "",
    reviewer_email: "",
    reviewee_email: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      task_id: taskId,
      reviewee_email: freelancerEmail,
    }));
  }, [taskId, freelancerEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Review Submitted Successfully ⭐");

        setFormData({
          task_id: taskId,
          reviewer_email: "",
          reviewee_email: freelancerEmail,
          rating: 5,
          comment: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 rounded-[32px] bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-8 shadow-2xl">
          <h1 className="text-5xl font-black text-white">
            Leave Review ⭐
          </h1>

          <p className="mt-3 text-lg text-orange-100">
            Share your experience with the freelancer and help build trust.
          </p>
        </div>

        <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="mb-2 block font-semibold text-white">
                Task ID
              </label>

              <input
                type="text"
                value={formData.task_id}
                readOnly
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-white">
                Your Email
              </label>

              <input
                type="email"
                placeholder="client@email.com"
                value={formData.reviewer_email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reviewer_email: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-white">
                Freelancer Email
              </label>

              <input
                type="email"
                value={formData.reviewee_email}
                readOnly
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-white">
                Rating
              </label>

              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-orange-500"
              >
                <option value="5">
                  ⭐⭐⭐⭐⭐ Excellent
                </option>

                <option value="4">
                  ⭐⭐⭐⭐ Very Good
                </option>

                <option value="3">
                  ⭐⭐⭐ Good
                </option>

                <option value="2">
                  ⭐⭐ Fair
                </option>

                <option value="1">
                  ⭐ Poor
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-white">
                Review Message
              </label>

              <textarea
                placeholder="Write your review..."
                value={formData.comment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comment: e.target.value,
                  })
                }
                rows={6}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02]"
            >
              Submit Review ⭐
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}


export default function ReviewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewsPageContent />
    </Suspense>
  );
}