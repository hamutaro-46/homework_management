// 日付まわりの小さな関数

// 今日の日付を "2026-11-09" の形で返す
export function today(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// 締切を過ぎているか("YYYY-MM-DD" は文字列のまま大小比較できる)
export function isOverdue(dueDate: string): boolean {
  return dueDate !== "" && dueDate < today();
}