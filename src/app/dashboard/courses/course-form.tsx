"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CourseFormProps = {
  mode: "create" | "edit";
  course?: {
    id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  };
};

export default function CourseForm({ mode, course }: CourseFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      category: String(formData.get("category")),
      level: String(formData.get("level")),
      duration: String(formData.get("duration")),
      status: String(formData.get("status")),
    };

    try {
      const url =
        mode === "create" ? "/api/courses" : `/api/courses/${course?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong.");
        return;
      }

      router.push("/dashboard/courses");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-2xl space-y-5 rounded-2xl border border-white/10 bg-white/10 p-6"
    >
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="text-sm font-medium text-slate-200">
          Course Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={course?.title}
          placeholder="JavaScript Fundamentals"
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-slate-200"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={course?.description}
          placeholder="Learn the fundamentals of JavaScript."
          rows={4}
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="text-sm font-medium text-slate-200"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            defaultValue={course?.category}
            placeholder="Web Development"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
          />
        </div>

        <div>
          <label htmlFor="level" className="text-sm font-medium text-slate-200">
            Level
          </label>
          <input
            id="level"
            name="level"
            required
            defaultValue={course?.level}
            placeholder="Beginner"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="duration"
            className="text-sm font-medium text-slate-200"
          >
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            required
            defaultValue={course?.duration}
            placeholder="4 weeks"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="text-sm font-medium text-slate-200"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            title="Status"
            aria-label="Status"
            defaultValue={course?.status || "ACTIVE"}
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white/30"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200 disabled:opacity-60"
      >
        {loading
          ? mode === "create"
            ? "Creating..."
            : "Updating..."
          : mode === "create"
            ? "Create Course"
            : "Update Course"}
      </button>
    </form>
  );
}