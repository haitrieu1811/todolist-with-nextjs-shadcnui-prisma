"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ModeToggle } from "@/components/mode-toggle";
import TodoItem from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { CreateTodoSchemaType } from "@/rules/todo.rules";
import { GetTodoResponse, GetTodosResponse } from "@/types/todo.types";

export default function Home() {
  const { toast } = useToast();

  const [currentTodoId, setCurrentTodoId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } =
    useForm<CreateTodoSchemaType>({
      defaultValues: {
        title: "",
        level: "NORMAL",
      },
    });

  const getTodosQuery = useQuery({
    queryKey: ["get-todos"],
    queryFn: () => axios.get<GetTodosResponse>("/api/todo"),
  });

  const todos = useMemo(
    () => getTodosQuery.data?.data.data.todos ?? [],
    [getTodosQuery.data?.data.data.todos]
  );

  const getTodoQuery = useQuery({
    queryKey: ["get-todo", currentTodoId],
    queryFn: () => axios.get<GetTodoResponse>(`/api/todo/${currentTodoId}`),
    enabled: !!currentTodoId,
  });

  const currentTodo = useMemo(
    () => getTodoQuery.data?.data.data.todo,
    [getTodoQuery.data?.data.data.todo]
  );

  useEffect(() => {
    if (!currentTodo) {
      setValue("title", "");
      setValue("level", "NORMAL");
      return;
    }
    setValue("title", currentTodo.title);
    setValue(
      "level",
      currentTodo.level as "DELIBERATELY" | "NORMAL" | "DEADLINE"
    );
  }, [currentTodo, setValue]);

  const startEditTodo = (todoId: string) => {
    setCurrentTodoId(todoId);
  };

  const stopEditTodo = () => {
    setCurrentTodoId(null);
  };

  const createTodoMutation = useMutation({
    mutationKey: ["create-todo"],
    mutationFn: (data: {
      title: string;
      level: "DELIBERATELY" | "NORMAL" | "DEADLINE";
    }) => axios.post("/api/todo", data),
    onSuccess: () => {
      toast({
        title: "Thêm công việc thành công",
        description: "Công việc đã được thêm vào danh sách",
      });
      reset();
      getTodosQuery.refetch();
    },
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["update-todo"],
    mutationFn: (data: {
      title: string;
      level: "DELIBERATELY" | "NORMAL" | "DEADLINE";
    }) => axios.patch(`/api/todo/${currentTodoId}`, data),
    onSuccess: () => {
      toast({
        title: "Cập nhật công việc thành công",
        description: "Công việc đã được cập nhật vào danh sách",
      });
      reset();
      getTodosQuery.refetch();
      stopEditTodo();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!currentTodoId) {
      createTodoMutation.mutate(data);
    } else {
      updateTodoMutation.mutate(data);
    }
  });

  return (
    <main className="h-screen w-1/2 mx-auto py-10">
      <h1 className="font-bold text-3xl text-center">Todo list</h1>
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <Separator className="my-6" />
      <form className="space-y-4" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Thêm việc cần làm"
              className="mt-10"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="level"
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn mức độ công việc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DELIBERATELY">
                  <span className="text-blue-500 font-medium">Thong thả</span>
                </SelectItem>
                <SelectItem value="NORMAL">
                  <span className="text-yellow-500 font-medium">
                    Bình thường
                  </span>
                </SelectItem>
                <SelectItem value="DEADLINE">
                  <span className="text-red-500 font-medium">Deadline</span>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <div className="flex space-x-2">
          <Button type="submit">
            {(createTodoMutation.isPending || updateTodoMutation.isPending) && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {currentTodoId ? "Cập nhật" : "Thêm"}
          </Button>
          {currentTodoId && (
            <Button type="button" variant="destructive" onClick={stopEditTodo}>
              Hủy
            </Button>
          )}
        </div>
      </form>
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="unfinished">Chưa thực hiện</TabsTrigger>
          <TabsTrigger value="finished">Đã thực hiện</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4 py-6">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todoData={todo}
                startEditTodo={startEditTodo}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="unfinished">Chưa thực hiện.</TabsContent>
        <TabsContent value="finished">Đã thực hiện.</TabsContent>
      </Tabs>
    </main>
  );
}
