import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={150}
        height={150}
        priority
        unoptimized
        className="h-[150px] w-[150px] rounded-full object-cover shadow-[0_18px_40px_-12px_rgba(120,72,40,0.35),0_4px_12px_-4px_rgba(120,72,40,0.2)] ring-4 ring-white/80 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] dark:ring-white/10"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] text-stone-500 dark:text-stone-400">{bio}</p>
    </header>
  );
}
