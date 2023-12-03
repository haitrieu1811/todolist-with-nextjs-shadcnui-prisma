import { CheckCheck, Pencil, Trash, RotateCcw } from "lucide-react";
import classNames from "classnames";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TodoType } from "@/types/todo.types";

const todoBadges = {
  DELIBERATELY: <Badge className="bg-blue-500">Thong thả</Badge>,
  NORMAL: <Badge className="bg-yellow-500">Bình thường</Badge>,
  DEADLINE: <Badge className="bg-red-500">Deadline</Badge>,
};

type TodoItemProps = {
  todoData: TodoType;
};

const TodoItem = ({ todoData }: TodoItemProps) => {
  return (
    <div className="border border-border rounded-lg px-6 py-3 flex justify-between items-center">
      <div className="flex items-center">
        {todoBadges[todoData.level as keyof typeof todoBadges]}
        <span
          className={classNames("ml-4", {
            "line-through text-muted-foreground": todoData.isFinished,
          })}
        >
          {todoData.title}
        </span>
      </div>
      <TooltipProvider>
        <div className="flex space-x-2">
          {todoData.isFinished && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  <RotateCcw size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Đánh dấu là chưa hoàn thành và cần làm lại
              </TooltipContent>
            </Tooltip>
          )}
          {!todoData.isFinished && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" className="bg-green-500 hover:bg-green-600">
                  <CheckCheck size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Đánh dấu là đã hoàn thành</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="bg-blue-500 hover:bg-blue-600">
                <Pencil size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Chỉnh sửa nội dung công việc cần làm
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="bg-red-500 hover:bg-red-600">
                <Trash size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xóa công việc này khỏi danh sách</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default TodoItem;
