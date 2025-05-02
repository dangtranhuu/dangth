import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["vi", "en"],

  // Used when no locale matches
  defaultLocale: "vi",
  localePrefix: 'as-needed', // <- tự ẩn locale nếu là default
  pathnames: {
    "/project": {
      en: "/project",
      vi: "/du-an",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
