import Link from "next/link";

import CourseForm from "../course-form";

export default function NewCoursePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-slate-400">Dashboard / Courses / New</p>
        <h1 className="mt-2 text-4xl font-bold">Create Course</h1>
        <p className="mt-3 text-slate-300">
          Add a new course for quiz creation and student learning.
        </p>

        <CourseForm mode="create" />

        <div className="mt-8">
          <Link
            href="/dashboard/courses"
            className="text-sm text-slate-400 underline"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    </main>
  );
}