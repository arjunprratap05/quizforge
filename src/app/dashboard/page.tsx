import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role || "STUDENT";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">QuizForge Dashboard</p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome, {session?.user?.name || "User"}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-300">
              Manage quizzes, students, attempts, and AI-powered learning
              feedback from one place.
            </p>

            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">
              Current Role: <span className="ml-2 font-semibold">{role}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
            >
              Back Home
            </Link>

            <Link
              href="/api/auth/signout"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              Logout
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <p className="text-sm text-slate-400">Total Quizzes</p>
            <h2 className="mt-3 text-4xl font-bold">0</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <p className="text-sm text-slate-400">Students</p>
            <h2 className="mt-3 text-4xl font-bold">0</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <p className="text-sm text-slate-400">Quiz Attempts</p>
            <h2 className="mt-3 text-4xl font-bold">0</h2>
          </div>
        </div>

        {role === "MENTOR" && (
          <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <h2 className="text-2xl font-bold">Mentor Tools</h2>
            <p className="mt-2 text-slate-300">
              As a mentor, you can create courses, manage quizzes, and review
              student progress.
            </p>

            <Link
              href="/dashboard/courses"
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200"
            >
              Manage Courses
            </Link>
          </div>
        )}

        {role === "STUDENT" && (
          <div className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
            <h2 className="text-2xl font-bold">Student Area</h2>
            <p className="mt-2 text-slate-300">
              As a student, you can attempt quizzes and view your learning
              feedback.
            </p>
          </div>
        )}

        {role === "ADMIN" && (
          <div className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="mt-2 text-slate-300">
              As an admin, you can manage users, courses, quizzes, and platform
              settings.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}