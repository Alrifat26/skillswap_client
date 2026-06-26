"use client";

import { useEffect, useState } from "react";

export default function BrowseFreelancersPage() {
const [freelancers, setFreelancers] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
loadFreelancers();
}, []);

const loadFreelancers =
async () => {
try {
const res = await fetch(
"NEXT_PUBLIC_URL/api/freelancers"
);


    const data =
      await res.json();

    setFreelancers(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


return ( <div className="min-h-screen bg-slate-100 p-8">
{/* Hero */} <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 p-10 text-white shadow-xl"> <h1 className="text-5xl font-black">
Browse Freelancers 🚀 </h1>


    <p className="mt-3 text-lg text-blue-100">
      Find talented freelancers
      and hire the perfect person
      for your task.
    </p>
  </div>

  {loading ? (
    <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-lg">
      Loading Freelancers...
    </div>
  ) : freelancers.length ===
    0 ? (
    <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-slate-700">
        No Freelancers Found
      </h2>
    </div>
  ) : (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {freelancers.map(
        (freelancer) => (
          <div
            key={
              freelancer._id
            }
            className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  freelancer.image ||
                  "https://i.pravatar.cc/300"
                }
                alt={
                  freelancer.name
                }
                className="h-20 w-20 rounded-full object-cover"
              />

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {
                    freelancer.name
                  }
                </h2>

                <p className="text-slate-500">
                  {
                    freelancer.email
                  }
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-semibold text-slate-700">
                Skills
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {freelancer.skills?.map(
                  (
                    skill,
                    index
                  ) => (
                    <span
                      key={
                        index
                      }
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-yellow-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  Rating
                </p>

                <h3 className="text-2xl font-bold text-yellow-500">
                  ⭐{" "}
                  {
                    freelancer.rating
                  }
                </h3>
              </div>

              <div className="rounded-2xl bg-green-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  Jobs
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  {
                    freelancer.completedJobs
                  }
                </h3>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700">
              View Profile
            </button>
          </div>
        )
      )}
    </div>
  )}
</div>


);
}
