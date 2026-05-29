"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      role: String(formData.get("role")),
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed.");
        return;
      }

      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-slate-300">
          Join QuizForge as an admin, mentor, or student.
        </p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-200">Name</label>
            <input
              name="name"
              required
              placeholder="Arjun Pratap"
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="arjun@example.com"
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Minimum 6 characters"
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
            />
          </div>

          <div>
  <label
    htmlFor="role"
    className="text-sm font-medium text-slate-200"
  >
    Role
  </label>

  <select
    id="role"
    name="role"
    title="Role"
    aria-label="Role"
    defaultValue="STUDENT"
    className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white/30"
  >
    <option value="ADMIN">Admin</option>
    <option value="MENTOR">Mentor</option>
    <option value="STUDENT">Student</option>
  </select>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-white underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}