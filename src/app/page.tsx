import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-slate-300">
            AI-Powered EdTech Quiz Platform
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            QuizForge helps mentors create quizzes, track performance, and
            improve student learning with AI.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            A full-stack platform built with Next.js, TypeScript, PostgreSQL,
            Prisma, authentication, quiz management, and AI-powered learning
            recommendations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h3 className="text-xl font-semibold">Quiz Management</h3>
            <p className="mt-3 text-sm text-slate-300">
              Create, publish, and manage quizzes with MCQ questions,
              explanations, difficulty levels, and durations.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h3 className="text-xl font-semibold">Student Performance</h3>
            <p className="mt-3 text-sm text-slate-300">
              Track scores, attempts, weak areas, and learning progress through
              a clean dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h3 className="text-xl font-semibold">AI Feedback</h3>
            <p className="mt-3 text-sm text-slate-300">
              Generate personalized improvement plans based on quiz results and
              incorrect answers.
            </p>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built by <strong className="text-white">Arjun Pratap</strong>
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/arjunprratap05/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 transition hover:text-white hover:underline"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/arjun-pratap-6132941a6"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 transition hover:text-white hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}