"use client";

import { STATUS_LABELS, type TaskStatus } from "../types/task";

// "all"(すべて)も選べるように型を広げる
export type FilterValue = TaskStatus | "all";

type Props = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
};

export default function TaskFilter({ value, onChange, counts }: Props) {
  const options: { value: FilterValue; label: string }[] = [
    { value: "all", label: "すべて" },
    ...Object.entries(STATUS_LABELS).map(([v, label]) => ({
      value: v as TaskStatus,
      label,
    })),
  ];

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3 py-1 text-sm ${
            value === opt.value ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          {opt.label}({counts[opt.value]})
        </button>
      ))}
    </div>
  );
}