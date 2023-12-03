import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

import prisma from "../../../../prisma/client";

const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Tiêu đề không được để trống",
    })
    .max(255, {
      message: "Tiêu đề không được quá 255 ký tự",
    }),
});

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
