export type LinkIcon = "github" | "naver" | "email";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon?: LinkIcon;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "곽호범",
  bio: "AI 시대에 우린 어떻게 일할까",
  image: "/profile.png",
  links: [
    { id: "github", title: "깃허브", url: "https://github.com/011221hobum", icon: "github" },
    { id: "blog", title: "블로그", url: "https://blog.naver.com/bumbumbum-", icon: "naver" },
    { id: "email", title: "이메일", url: "mailto:uyop011221@gmail.com", icon: "email" },
  ],
};
