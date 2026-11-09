"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import TaskFilter, { type FilterValue } from "../components/TaskFilter";
import type { NewTask, Task, TaskStatus } from "../.next/types/task";
import { loadTasks, saveTasks } from "../lib/storage";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [loaded, setLoaded] = useState(false);

  // 最初に1回だけ、保存されている課題を読み込む
  useEffect(() => {
    setTasks(loadTasks());
    setLoaded(true);
  }, []);

  // 課題が変わるたびに保存する(読み込み前に空で上書きしないよう loaded を確認)
  useEffect(() => {
    if (loaded) saveTasks(tasks);
  }, [tasks, loaded]);

  const addTask = (input: NewTask) => {
    const task: Task = {
      ...input,
      id: crypto.randomUUID(),
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const changeStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 件数(フィルターのボタンに表示)
  const counts: Record<FilterValue, number> = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    doing: tasks.filter((t) => t.status === "doing").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  // 表示する課題:絞り込み → 締切が近い順(締切なしは最後)
  const visibleTasks = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .sort((a, b) => {
      if (a.dueDate === b.dueDate) return 0;
      if (a.dueDate === "") return 1;
      if (b.dueDate === "") return -1;
      return a.dueDate < b.dueDate ? -1 : 1;
    });

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">課題管理</h1>

      <TaskForm onAdd={addTask} />

      <TaskFilter value={filter} onChange={setFilter} counts={counts} />

      {!loaded ? (
        <p className="text-gray-500">読み込み中…</p>
      ) : visibleTasks.length === 0 ? (
        <p className="text-gray-500">課題はありません。</p>
      ) : (
        <ul className="space-y-2">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChangeStatus={changeStatus}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </main>
  );
}