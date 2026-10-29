"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    setCount((prev) => prev + 1);
    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive를 사용합니다.
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: link.id }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <span>{link.title}</span>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">{count.toLocaleString()} 클릭</span>
    </a>
  );
}
