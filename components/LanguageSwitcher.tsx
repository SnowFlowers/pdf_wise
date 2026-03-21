"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="locale-select" className="sr-only">
        {t("label")}
      </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        className="max-w-[10rem] cursor-pointer rounded-lg border border-zinc-200 bg-white py-1.5 pl-2 pr-8 text-xs font-medium text-zinc-700 outline-none ring-[var(--accent)]/25 focus:border-[var(--accent)] focus:ring-2 sm:text-sm"
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {t(code)}
          </option>
        ))}
      </select>
    </div>
  );
}
