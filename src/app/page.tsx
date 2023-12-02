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

export default function Home() {
  return (
    <main className="h-screen w-1/3 mx-auto py-10">
      <h1 className="font-bold text-3xl text-center">Todo list</h1>
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <Separator className="my-6" />
      <div className="space-y-4">
        <Input type="text" placeholder="Thêm việc cần làm" className="mt-10" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Chọn mức độ công việc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <span className="text-blue-500 font-medium">Thong thả</span>
            </SelectItem>
            <SelectItem value="medium">
              <span className="text-yellow-500 font-medium">Bình thường</span>
            </SelectItem>
            <SelectItem value="heavy">
              <span className="text-red-500 font-medium">Deadline</span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button>Thêm</Button>
      </div>
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="unfinished">Chưa thực hiện</TabsTrigger>
          <TabsTrigger value="finished">Đã thực hiện</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <TodoItem key={index} />
            ))}
        </TabsContent>
        <TabsContent value="unfinished">Chưa thực hiện.</TabsContent>
        <TabsContent value="finished">Đã thực hiện.</TabsContent>
      </Tabs>
    </main>
  );
}
