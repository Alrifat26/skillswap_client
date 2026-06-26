import { notFound } from "next/navigation";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function FreelancerProfile({
  params,
}) {
  const { id } = await params;

  await client.connect();

  const db = client.db("skill_swap_db");

  const freelancer = await db
    .collection("user")
    .findOne({
      _id: new ObjectId(id),
    });

  if (!freelancer) {
    return notFound();
  }

  const reviews = await db
    .collection("reviews")
    .find({
      reviewee_email: freelancer.email,
    })
    .sort({ created_at: -1 })
    .toArray();

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[40px] bg-white/10 p-10 backdrop-blur-xl">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <img
                src={
                  freelancer.image ||
                  "https://i.pravatar.cc/300"
                }
                alt={freelancer.name}
                className="h-40 w-40 rounded-full border-4 border-white object-cover"
              />

              <div>
                <h1 className="text-5xl font-black text-white">
                  {freelancer.name}
                </h1>

                <p className="mt-3 text-xl text-blue-100">
                  Professional Freelancer
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {freelancer.skills?.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left */}
          <div className="rounded-[32px] bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold">
              Quick Info
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-slate-500">
                  Email
                </p>

                <h3 className="font-bold">
                  {freelancer.email}
                </h3>
              </div>

              <div>
                <p className="text-slate-500">
                  Hourly Rate
                </p>

                <h3 className="text-3xl font-black text-green-600">
                  $
                  {freelancer.hourlyRate ||
                    0}
                  /hr
                </h3>
              </div>

              <div>
                <p className="text-slate-500">
                  Rating
                </p>

                <h3 className="text-3xl font-black text-yellow-500">
                  ⭐ {avgRating}
                </h3>
              </div>

              <div>
                <p className="text-slate-500">
                  Reviews
                </p>

                <h3 className="text-3xl font-black text-blue-600">
                  {reviews.length}
                </h3>
              </div>

            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 rounded-[32px] bg-white p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-slate-900">
              About Freelancer
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {freelancer.bio ||
                "No bio available yet."}
            </p>

            {/* Skills */}
            <div className="mt-10 rounded-[24px] bg-slate-100 p-6">
              <h3 className="font-bold text-slate-900">
                Skills
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {freelancer.skills?.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-600 px-4 py-2 font-medium text-white"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <h2 className="mb-6 text-3xl font-black text-slate-900">
                Reviews ⭐
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(
                    (review) => (
                      <div
                        key={
                          review._id
                        }
                        className="rounded-2xl border bg-slate-50 p-5"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">
                            {
                              review.reviewer_email
                            }
                          </h3>

                          <span className="font-bold text-yellow-500">
                            ⭐
                            {
                              review.rating
                            }
                          </span>
                        </div>

                        <p className="mt-3 text-slate-600">
                          {
                            review.comment
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-100 p-8 text-center">
                  <p className="text-slate-500">
                    No Reviews Yet
                  </p>
                </div>
              )}
            </div>

            {/* Hire Card */}
            <div className="mt-10 rounded-[24px] bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h3 className="text-2xl font-bold">
                Ready to Hire?
              </h3>

              <p className="mt-2 text-blue-100">
                This freelancer is available
                for new projects.
              </p>

              <button className="mt-5 rounded-xl bg-white px-6 py-3 font-bold text-blue-700">
                Contact Freelancer
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}