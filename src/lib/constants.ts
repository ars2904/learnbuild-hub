export interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Learn", href: "/learn" },
  { name: "Build", href: "/build" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export const SITE_CONFIG = {
  name: "LearnBuild Hub",
  tagline: "Learn. Build.",
  email: "learnbuildh@gmail.com",
  instagram: "https://www.instagram.com/learnbuildhub?stkn=MXR0aW1ldzRsZ2xwZA==",
  youtube: "https://youtube.com/@learnbuildhub",
  discord: "https://discord.gg/learnbuildhub",
  location: "India (Working remotely, connecting globally)",
  responseSLA: "24-48 hours",
};
