import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["ADMIN", "MENTOR", "STUDENT"]).default("STUDENT"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const courseSchema = z.object({
  title: z.string().min(3, "Course title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.string().min(2, "Category is required."),
  level: z.string().min(2, "Level is required."),
  duration: z.string().min(2, "Duration is required."),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]),
});

export const quizSchema = z.object({
  title: z.string().min(3, "Quiz title is required."),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  courseId: z.string().min(1, "Course is required."),
  batchId: z.string().optional(),
});

export const questionSchema = z.object({
  questionText: z.string().min(5, "Question is required."),
  optionA: z.string().min(1, "Option A is required."),
  optionB: z.string().min(1, "Option B is required."),
  optionC: z.string().min(1, "Option C is required."),
  optionD: z.string().min(1, "Option D is required."),
  correctAnswer: z.enum(["A", "B", "C", "D"]),
  explanation: z.string().optional(),
  quizId: z.string().min(1, "Quiz ID is required."),
});

export const studentSchema = z.object({
  name: z.string().min(2, "Student name is required."),
  email: z.string().email("Valid email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z.string().optional(),
  learningGoal: z.string().optional(),
  currentSkillLevel: z.string().optional(),
  batchId: z.string().optional(),
});

export const quizAttemptSchema = z.object({
  quizId: z.string().min(1, "Quiz ID is required."),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedAnswer: z.enum(["A", "B", "C", "D"]),
    })
  ),
});