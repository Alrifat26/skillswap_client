"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FreelancersPage() {
const [freelancers, setFreelancers] = useState([]);
const [filtered, setFiltered] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {
loadFreelancers();
}, []);

useEffect(() => {
const result = freelancers.filter((item) =>
item.name?.toLowerCase().includes(search.toLowerCase())
);


setFiltered(result);


}, [search, freelancers]);

const loadFreelancers = async () => {
try {
const res = await fetch("/api/freelancers");
const data = await res.json();


  setFreelancers(data);
  setFiltered(data);
} catch (error) {
  console.error(error);
}


};

return ( <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8"> <div className="mx-auto max-w-7xl">


    <div className="mb-10 rounded-[35px] bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-10 shadow-2xl">
      <h1 className="text-5xl font-black text-white">
        Browse Freelancers 🚀
      </h1>

      <p className="mt-4 text-lg text-orange-100">
        Discover talented freelancers ready to complete your tasks.
      </p>
    </div>

    <div className="mb-10">
      <input
        type="text"
        placeholder="Search freelancers..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white placeholder-slate-400 outline-none focus:border-orange-500"
      />
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((freelancer) => (
        <div
          key={freelancer._id}
          className="rounded-[30px] border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all hover:-translate-y-2 hover:border-orange-500"
        >
          <div className="flex flex-col items-center">

            <img
              src={
                freelancer.image ||
                "https://i.ibb.co/2M7rtLk/avatar.png"
              }
              alt={freelancer.name}
              className="h-28 w-28 rounded-full border-4 border-orange-500 object-cover"
            />

            <h2 className="mt-5 text-2xl font-bold text-white">
              {freelancer.name}
            </h2>

            <p className="mt-1 text-slate-400">
              Freelancer
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
            {(Array.isArray(freelancer.skills)
              ? freelancer.skills
            : typeof freelancer.skills === "string"
              ? freelancer.skills.split(",")
          : []
            ).map((skill, index) => (
          <span
           key={index}
              className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600"
          >
            {skill.trim()}
           </span>
          ))}
        </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="text-xl text-yellow-400">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="font-semibold text-white">
                {freelancer.rating || 5}
              </span>
            </div>

            <div className="mt-5 rounded-xl bg-slate-800 px-4 py-2">
              <span className="font-bold text-green-400">
                $
                {freelancer.hourlyRate ||
                  25}
                /hour
              </span>
            </div>

            <p className="mt-4 line-clamp-3 text-center text-sm text-slate-400">
              {freelancer.bio ||
                "Professional freelancer ready to work on your project."}
            </p>

            <Link
              href={`/freelancers/${freelancer._id}`}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-center font-bold text-white transition-all hover:scale-105"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>

    {filtered.length === 0 && (
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-white">
          No Freelancer Found
        </h2>
      </div>
    )}
  </div>
</div>


);
}
