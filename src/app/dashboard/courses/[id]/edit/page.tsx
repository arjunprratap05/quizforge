import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import CourseForm from "../../../course-form";

type EditCoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-slate-400">Dashboard / Courses / Edit</p>
        <h1 className="mt-2 text-4xl font-bold">Edit Course</h1>
        <p className="mt-3 text-slate-300">
          Update course information and status.
        </p>

        <CourseForm mode="edit" course={course} />

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