import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-16">
      <ThemeToggle />

      {/* 상단: 원형 프로필 사진, 이름, 한 줄 소개 */}
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      {/* 하단: 링크 카드 목록 (세로 배치) */}
      <nav className="mt-10 flex flex-col gap-6">
        {profile.links.map((link) => (
          <LinkCard key={link.id} link={link} initialCount={counts[link.id] ?? 0} />
        ))}
      </nav>
    </main>
  );
}
