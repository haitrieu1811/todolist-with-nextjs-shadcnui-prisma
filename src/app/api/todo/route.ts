import { NextRequest, NextResponse } from "next/server";

import { createTodoSchema } from "@/rules/todo.rules";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const isValidation = createTodoSchema.safeParse(body);
  if (!isValidation.success)
    return NextResponse.json(isValidation.error.errors, { status: 400 });
  const newTodo = await prisma.todo.create({
    data: {
      title: body.title,
      level: body.level,
    },
  });
  return NextResponse.json(newTodo, {
    status: 201,
  });
}

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({
    data: {
      todos,
    },
  });
}
