"use client";

import axios from "axios";
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

export default function Home() {
  const { toast } = useToast();

  const { control, handleSubmit, reset } = useForm<CreateTodoSchemaType>({
    defaultValues: {
      title: "",
      level: "NORMAL",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await axios.post("/api/todo", data);
    toast({
      title: "Thêm công việc thành công",
      description: "Công việc đã được thêm vào danh sách",
    });
    reset();
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit">Thêm công việc</Button>
      </form>
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="unfinished">Chưa thực hiện</TabsTrigger>
          <TabsTrigger value="finished">Đã thực hiện</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4 py-6">
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <TodoItem key={index} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="unfinished">Chưa thực hiện.</TabsContent>
        <TabsContent value="finished">Đã thực hiện.</TabsContent>
      </Tabs>
    </main>
  );
}
