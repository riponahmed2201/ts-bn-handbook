import { defineConfig } from "vitepress";

export default defineConfig({
  // GitHub Pages-এ host করলে repo name অনুযায়ী base লাগে
  // GitHub Actions workflow থেকে BASE="/<repo>/" সেট করে deploy করা হবে
  base: process.env.BASE || "/",
  title: "TypeScript Bangla Handbook",
  description: "বাংলায় TypeScript শেখার chapter-wise handbook",
  lang: "en-US",
  cleanUrls: true,
  themeConfig: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    siteTitle: "TypeScript Bangla Handbook",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Learn",
        items: [
          { text: "Introduction", link: "/chapter-1" },
          { text: "Operators", link: "/chapter-2" },
          { text: "Types", link: "/chapter-3" },
          { text: "Functions", link: "/chapter-4" },
          { text: "Interfaces", link: "/chapter-5" },
          { text: "Classes", link: "/chapter-6" }
        ]
      },
      { text: "GitHub", link: "https://github.com/riponahmed2201/TypeScript-Bangla-Handbook" }
    ],
    sidebar: [
      {
        text: "Foundation Track",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/chapter-1" },
          { text: "Operators", link: "/chapter-2" }
        ]
      },
      {
        text: "Core TypeScript",
        collapsed: false,
        items: [
          { text: "Types", link: "/chapter-3" },
          { text: "Functions", link: "/chapter-4" },
          { text: "Interfaces", link: "/chapter-5" },
          { text: "Classes", link: "/chapter-6" }
        ]
      },
      
    ],
    outline: [2, 3],
    outlineTitle: "On this page",
    search: {
      provider: "local"
    },
    editLink: {
      pattern: "https://github.com/riponahmed2201/TypeScript-Bangla-Handbook/edit/main/:path",
      text: "Edit this page on GitHub"
    },
    docFooter: {
      prev: "Previous",
      next: "Next"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/riponahmed2201/TypeScript-Bangla-Handbook" }
    ],
    footer: {
      message: "Built with VitePress",
      copyright: "Copyright © TypeScript Bangla Handbook"
    }
  }
});
