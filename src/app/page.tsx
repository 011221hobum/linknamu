import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-7 pb-16 pt-20 sm:px-8 sm:pt-24">
      {/* 유리 카드 뒤로 비쳐 보일 은은한 색 번짐 */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/20" />
        <div className="absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl dark:bg-rose-900/15" />
      </div>

      <ThemeToggle />

      {/* 상단: 원형 프로필 사진, 이름, 한 줄 소개 */}
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      {/* 하단: 링크 카드 목록 (세로 배치) */}
      <nav className="mt-12 flex flex-col gap-4">
        {profile.links.map((link) => (
          <LinkCard key={link.id} link={link} initialCount={counts[link.id] ?? 0} />
        ))}
      </nav>
    </main>
  );
}
