// 課題のステータス(この3つ以外の値は入れられない)
export type TaskStatus = "todo" | "doing" | "done";

// 課題1件の形
export type Task = {
  id: string;
  title: string;
  memo: string;
  dueDate: string; // "2026-11-20" のような形式。締切なしなら ""
  status: TaskStatus;
  createdAt: string;
};

// 新しく課題を作るときに入力する項目(id などは自動で付ける)
export type NewTask = Pick<Task, "title" | "memo" | "dueDate">;

// 画面に表示するラベル
export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "未着手",
  doing: "進行中",
  done: "完了",
};
