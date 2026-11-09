"use client";

import { useState } from "react";
import type { NewTask } from "../.next/types/task";

// 親コンポーネントから受け取るもの(props)の型
type Props = {
  onAdd: (task: NewTask) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページの再読み込みを止める
    if (title.trim() === "") return;
    onAdd({ title: title.trim(), memo: memo.trim(), dueDate });
    setTitle("");
    setMemo("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-lg border p-4">
      <input
        className="w-full rounded border px-3 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="課題名(例:数学レポート)"
      />
      <textarea
        className="w-full rounded border px-3 py-2"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="メモ(任意)"
        rows={2}
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">締切</label>
        <input
          type="date"
          className="rounded border px-2 py-1"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="submit"
          className="ml-auto rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          追加
        </button>
      </div>
    </form>
  );
}