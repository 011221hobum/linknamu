"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 서버에서 값을 받기 전까지는 모든 카드가 0회로 보입니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then(setCounts)
      .catch(() => {});
  }, []);

  return (
    <nav className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} serverCount={counts[link.id] ?? 0} />
      ))}
    </nav>
  );
}
