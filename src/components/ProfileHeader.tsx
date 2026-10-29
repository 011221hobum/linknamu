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
        width={144}
        height={144}
        priority
        unoptimized
        className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-md dark:border-neutral-800"
      />
      <h1 className="mt-4 text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">{bio}</p>
    </header>
  );
}
