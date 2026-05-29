import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { courseSchema } from "@/lib/validation";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("COURSE_GET_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch course.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const course = await prisma.course.update({
      where: {
        id,
      },
      data: parsed.data,
    });

    return NextResponse.json({
      success: true,
      message: "Course updated successfully.",
      data: course,
    });
  } catch (error) {
    console.error("COURSE_PUT_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update course.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.course.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error("COURSE_DELETE_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete course.",
      },
      { status: 500 }
    );
  }
}