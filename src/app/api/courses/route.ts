import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { courseSchema } from "@/lib/validation";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("COURSES_GET_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch courses.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = courseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: parsed.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully.",
        data: course,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("COURSES_POST_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create course.",
      },
      { status: 500 }
    );
  }
}