// データの保存・読み込みを担当するファイル
// 今はブラウザの localStorage に保存しています。
// あとで Supabase に移るときは、このファイルの中身を書き換えるだけで済むようにしています。

import type { Task } from "../.next/types/task";

const STORAGE_KEY = "kadai-app:tasks";

export function loadTasks(): Task[] {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? (JSON.parse(json) as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // 保存できない環境(プライベートモードなど)では何もしない
  }
}