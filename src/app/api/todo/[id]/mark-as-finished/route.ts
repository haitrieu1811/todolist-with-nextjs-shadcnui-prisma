import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../../../prisma/client";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      isFinished: true,
    },
  });
  return NextResponse.json({ data: { updatedTodo } });
}
