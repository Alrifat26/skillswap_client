"use client";

import { useEffect, useState } from "react";

export default function FreelancerProfilePage() {
  const [profile, setProfile] =
    useState({
      name: "",
      image: "",
      skills: "",
      bio: "",
      hourlyRate: "",
    });

  const [loading, setLoading] =
    useState(true);

  const email =
    "nana@nani.com";

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetch(
        `NEXT_PUBLIC_URL/api/users/${email}`
      );

      const data =
        await res.json();

      setProfile({
        name:
          data?.name || "",
        image:
          data?.image || "",
        skills:
          data?.skills || "",
        bio:
          data?.bio || "",
        hourlyRate:
          data?.hourlyRate ||
          "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (
    e
  ) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await fetch(
            `NEXT_PUBLIC_URL/api/users/${email}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                profile
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "✅ Profile Updated Successfully"
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-2xl font-bold text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-black">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 p-8 text-white shadow-2xl">

          <h1 className="text-4xl font-extrabold tracking-wide">
            Edit Profile 👤
          </h1>

          <p className="mt-3 text-lg text-orange-100">
            Update your freelancer profile professionally
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-white/90 p-10 shadow-2xl backdrop-blur-md"
        >

          <div className="grid gap-7">

            {/* Name */}
            <div>
              <label className="mb-2 block text-lg font-bold text-slate-800">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-black outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-lg font-bold text-slate-800">
                Profile Image URL
              </label>

              <input
                type="text"
                name="image"
                value={profile.image}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-black outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block text-lg font-bold text-slate-800">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-black outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="mb-2 block text-lg font-bold text-slate-800">
                Hourly Rate ($)
              </label>

              <input
                type="number"
                name="hourlyRate"
                value={profile.hourlyRate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-black outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="mb-2 block text-lg font-bold text-slate-800">
                Bio
              </label>

              <textarea
                rows="5"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-black outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 py-4 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              Save Profile 🚀
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}