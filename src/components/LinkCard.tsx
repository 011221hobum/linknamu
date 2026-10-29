"use client";

import { useState } from "react";
import type { LinkIcon, LinkItem } from "@/data/profile";

// GitHub·네이버는 유니코드 이모지가 없어서 로고를 SVG로 그립니다.
function Icon({ icon }: { icon: LinkIcon }) {
  if (icon === "email") {
    return <span className="flex h-5 w-5 items-center justify-center text-lg leading-none">✉️</span>;
  }
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded bg-[#03C75A]">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-2.5 w-2.5 fill-white">
        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
      </svg>
    </span>
  );
}

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

  // mailto: 링크는 새 탭으로 열면 빈 탭이 남으므로 http(s) 링크만 새 탭으로 엽니다.
  const isWeb = link.url.startsWith("http");

  return (
    <a
      href={link.url}
      target={isWeb ? "_blank" : undefined}
      rel={isWeb ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className="flex items-center justify-between rounded-3xl border border-white/60 bg-white/45 px-6 py-[18px] font-medium shadow-[0_8px_24px_-12px_rgba(120,72,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_12px_28px_-12px_rgba(120,72,40,0.3)] active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] dark:hover:bg-white/10"
    >
      <span className="flex items-center gap-3.5">
        {link.icon && <Icon icon={link.icon} />}
        {link.title}
      </span>
      <span className="text-xs tabular-nums text-stone-400 dark:text-stone-500">{count.toLocaleString()} 클릭</span>
    </a>
  );
}
