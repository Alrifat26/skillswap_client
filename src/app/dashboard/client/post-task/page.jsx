"use client";

import { useState } from "react";

export default function PostTaskPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const taskData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      budget: Number(form.budget.value),
      deadline: form.deadline.value,
      client_name: "Rifat",
      status: "open",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

      
      if (data.success) {
        alert("✅ Task Created Successfully");
        form.reset();
      } else {
        alert(`❌ Error: ${data.message || "Failed to create task"}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10 text-black">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold">
            Create New Task 🚀
          </h1>

          <p className="mt-3 text-orange-100">
            Publish your project and receive proposals from talented freelancers.
          </p>
        </div>

        
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg text-black">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                required
                placeholder="Need a Landing Page Design"
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Category
              </label>

              <select
                name="category"
                required
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black focus:border-orange-500 focus:outline-none"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                rows="6"
                required
                placeholder="Describe your project requirements..."
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Budget (USD)
                </label>

                <input
                  type="number"
                  name="budget"
                  required
                  placeholder="300"
                  className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-black focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-semibold text-white transition hover:bg-orange-600 disabled:bg-slate-400"
            >
              {loading ? "Creating Task..." : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}