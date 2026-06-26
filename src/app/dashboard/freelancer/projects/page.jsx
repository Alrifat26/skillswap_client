"use client";

import { useEffect, useState } from "react";

export default function ActiveProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [deliverableUrl, setDeliverableUrl] =
    useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch(
        "/api/freelancer/projects"
      );

      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitDeliverable = async (
    taskId
  ) => {
    if (!deliverableUrl) {
      alert("Enter Deliverable URL");
      return;
    }

    try {
      const res = await fetch(
        `/api/freelancer/projects/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            deliverable_url:
              deliverableUrl,
            status: "completed",
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        alert(
          "Project completed successfully"
        );

        setDeliverableUrl("");

        loadProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const activeProjects =
    projects.filter(
      (project) =>
        project.status ===
        "in-progress"
    );

  const completedProjects =
    projects.filter(
      (project) =>
        project.status ===
        "completed"
    );

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      {/* Hero */}
      <div className="rounded-[32px] bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-10 shadow-2xl">
        <h1 className="text-5xl font-black text-white">
          Active Projects 🚀
        </h1>

        <p className="mt-4 text-lg text-green-100">
          Track your current and
          completed freelance work.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-8 shadow-xl">
          <p className="text-orange-100">
            In Progress
          </p>

          <h2 className="mt-3 text-6xl font-black text-white">
            {
              activeProjects.length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 shadow-xl">
          <p className="text-green-100">
            Completed
          </p>

          <h2 className="mt-3 text-6xl font-black text-white">
            {
              completedProjects.length
            }
          </h2>
        </div>
      </div>

      {/* Active Projects */}
      <div className="mt-10 rounded-[32px] bg-slate-900 p-8 shadow-2xl">
        <h2 className="mb-6 text-3xl font-black text-white">
          In Progress Projects
        </h2>

        <div className="grid gap-6">
          {activeProjects.length >
          0 ? (
            activeProjects.map(
              (project) => (
                <div
                  key={
                    project._id
                  }
                  className="rounded-3xl border border-slate-700 bg-slate-800 p-6"
                >
                  <h3 className="text-2xl font-bold text-white">
                    {
                      project.title
                    }
                  </h3>

                  <p className="mt-2 text-slate-300">
                    Budget: $
                    {
                      project.budget
                    }
                  </p>

                  <div className="mt-5 flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter Deliverable URL"
                      value={
                        deliverableUrl
                      }
                      onChange={(
                        e
                      ) =>
                        setDeliverableUrl(
                          e.target
                            .value
                        )
                      }
                      className="flex-1 rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white"
                    />

                    <button
                      onClick={() =>
                        submitDeliverable(
                          project._id
                        )
                      }
                      className="rounded-xl bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="rounded-3xl bg-slate-800 p-12 text-center">
              <h3 className="text-2xl font-bold text-white">
                No Active
                Projects
              </h3>
            </div>
          )}
        </div>
      </div>

      {/* Completed */}
      <div className="mt-10 rounded-[32px] bg-slate-900 p-8 shadow-2xl">
        <h2 className="mb-6 text-3xl font-black text-white">
          Completed Projects
        </h2>

        <div className="grid gap-6">
          {completedProjects.length >
          0 ? (
            completedProjects.map(
              (project) => (
                <div
                  key={
                    project._id
                  }
                  className="rounded-3xl border border-green-700 bg-green-900/20 p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {
                        project.title
                      }
                    </h3>

                    <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
                      Completed
                    </span>
                  </div>

                  <p className="mt-3 text-green-300">
                    Deliverable:
                  </p>

                  <a
                    href={
                      project.deliverable_url
                    }
                    target="_blank"
                    className="text-blue-400 underline"
                  >
                    {
                      project.deliverable_url
                    }
                  </a>
                </div>
              )
            )
          ) : (
            <div className="rounded-3xl bg-slate-800 p-12 text-center">
              <h3 className="text-2xl font-bold text-white">
                No Completed
                Projects
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}