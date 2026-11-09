"use client";

import { STATUS_LABELS, type Task, type TaskStatus } from "../.next/types/task";
import { isOverdue } from "../lib/date";

type Props = {
  task: Task;
  onChangeStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onChangeStatus, onDelete }: Props) {
  const overdue = task.status !== "done" && isOverdue(task.dueDate);

  return (
    <li
      className={`rounded-lg border p-3 ${overdue ? "border-red-400 bg-red-50" : ""}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex-1 font-medium ${
            task.status === "done" ? "text-gray-400 line-through" : ""
          }`}
        >
          {task.title}
        </span>

        <select
          className="rounded border px-2 py-1 text-sm"
          value={task.status}
          onChange={(e) => onChangeStatus(task.id, e.target.value as TaskStatus)}
        >
          {/* Object.entries でラベル一覧から選択肢を作る */}
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          className="text-sm text-red-600 hover:underline"
          onClick={() => onDelete(task.id)}
        >
          削除
        </button>
      </div>

      <div className="mt-1 text-sm text-gray-600">
        {task.dueDate ? (
          <span className={overdue ? "font-bold text-red-600" : ""}>
            締切:{task.dueDate}
            {overdue && "(期限切れ)"}
          </span>
        ) : (
          <span>締切なし</span>
        )}
      </div>

      {task.memo && <p className="mt-1 text-sm whitespace-pre-wrap">{task.memo}</p>}
    </li>
  );
}