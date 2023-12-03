import * as z from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Tiêu đề không được để trống",
    })
    .max(255, {
      message: "Tiêu đề không được quá 255 ký tự",
    }),
  level: z.enum(["DELIBERATELY", "NORMAL", "DEADLINE"]),
});

export type CreateTodoSchemaType = z.infer<typeof createTodoSchema>;
