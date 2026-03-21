import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "ja", "ko", "es", "fr", "de", "pt"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
});
