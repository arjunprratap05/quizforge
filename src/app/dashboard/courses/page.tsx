import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteCourseButton from "./delete-course-button";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">Dashboard / Courses</p>
            <h1 className="mt-2 text-4xl font-bold">Course Management</h1>
            <p className="mt-3 text-slate-300">
              Create and manage courses used for quizzes and student learning.
            </p>
          </div>

          <Link
            href="/dashboard/courses/new"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200"
          >
            Add Course
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-slate-300">
              <tr>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Level</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No courses found. Create your first course.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b border-white/10">
                    <td className="px-5 py-4 font-medium">{course.title}</td>
                    <td className="px-5 py-4 text-slate-300">
                      {course.category}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {course.level}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {course.duration}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs">
                        {course.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/dashboard/courses/${course.id}/edit`}
                          className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10"
                        >
                          Edit
                        </Link>

                        <DeleteCourseButton courseId={course.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <Link href="/dashboard" className="text-sm text-slate-400 underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
    
  );
  <Link
  href="/dashboard/courses"
  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
>
  Manage Courses
</Link>
}