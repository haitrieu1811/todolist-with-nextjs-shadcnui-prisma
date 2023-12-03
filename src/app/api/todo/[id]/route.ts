import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../prisma/client";
import { createTodoSchema } from "@/rules/todo.rules";

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json(
    {
      data: {
        todo,
      },
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const isValidation = createTodoSchema.safeParse(body);
  if (!isValidation.success)
    return NextResponse.json(isValidation.error.errors, { status: 400 });
  const { id } = params;
  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      level: body.level,
    },
  });
  return NextResponse.json({ data: { updatedTodo } });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedTodo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ data: { deletedTodo } });
}
