"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

export function UrlInputRow() {
  const t = useTranslations("url");
  const router = useRouter();
  const [url, setUrl] = useState("");

  const submit = () => {
    if (!url.trim()) return;
    router.push("/workspace?source=url");
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor="doc-url" className="sr-only">
        {t("label")}
      </label>
      <input
        id="doc-url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t("placeholder")}
        className="min-h-11 flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none ring-[var(--accent)]/30 focus:border-[var(--accent)] focus:ring-2"
      />
      <button
        type="button"
        onClick={submit}
        className="min-h-11 shrink-0 rounded-xl bg-[var(--accent)] px-6 text-sm font-medium text-white transition hover:opacity-90"
      >
        {t("confirm")}
      </button>
    </div>
  );
}
