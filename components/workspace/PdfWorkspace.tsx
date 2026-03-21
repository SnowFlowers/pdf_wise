"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UploadFileModal } from "@/components/workspace/UploadFileModal";
import { useState } from "react";

export function PdfWorkspace() {
  const t = useTranslations("workspace");
  const [activeHistory, setActiveHistory] = useState<string>("h1");
  const [suggestedOpen, setSuggestedOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [pickedFileName, setPickedFileName] = useState<string | null>(null);

  const historyFiles = [
    { id: "h1", nameKey: "historyFile1" as const },
    { id: "h2", nameKey: "historyFile2" as const },
    { id: "h3", nameKey: "historyFile3" as const },
  ];

  const questions = ["question1", "question2", "question3"] as const;

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessage("");
  };

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col bg-[#f4f4f5] text-zinc-900">
      <UploadFileModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onFilesAccepted={(files) => {
          const f = files[0];
          if (f) setPickedFileName(f.name);
        }}
      />
      {/* 顶栏：返回 + 语言 */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--workspace-border)] bg-white px-4 py-2.5 lg:px-5">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--accent)] transition hover:underline"
        >
          {t("back")}
        </Link>
        <LanguageSwitcher />
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* 左侧：导航与历史 */}
        <aside className="flex w-full shrink-0 flex-col border-[var(--workspace-border)] bg-white lg:w-[240px] lg:border-r lg:border-b-0 lg:border-t-0">
          <div className="border-b border-[var(--workspace-border)] px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--workspace-red)] text-sm font-bold text-white">
                P
              </span>
              <span className="font-semibold tracking-tight">{t("sidebarBrand")}</span>
            </Link>
            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {t("newFile")}
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              {t("history")}
            </p>
            <ul className="mt-2 space-y-1">
              {historyFiles.map((item) => {
                const active = activeHistory === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveHistory(item.id)}
                      className={[
                        "flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-sm transition",
                        active ? "bg-blue-50 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5m-7.5 0H9.375a3.375 3.375 0 00-3.375 3.375V18m12-13.5h.008v.008H18V4.5z"
                        />
                      </svg>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 font-medium">{t(item.nameKey)}</span>
                        <span className="mt-0.5 block text-xs text-zinc-400">{t("historyDate")}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-[var(--workspace-border)] bg-zinc-50/80 p-4">
            <p className="text-center text-xs text-zinc-600">{t("unlockPro")}</p>
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-blue-50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15l-3-3a22 22 0 012-3A22 22 0 0119 3l3 3a22 22 0 01-6 8l-3-3"
                />
              </svg>
              {t("goPro")}
            </button>
          </div>
        </aside>

        {/* 中间：PDF 内容区 */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col border-[var(--workspace-border)] bg-white lg:border-r">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--workspace-border)] px-4 py-3 lg:px-5">
            <h1 className="text-base font-bold text-zinc-900">{t("pdfPaneTitle")}</h1>
            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="shrink-0 text-sm font-medium text-[var(--accent)] transition hover:underline"
            >
              {t("newFile")}
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-zinc-50/40 p-4 lg:p-6">
            <div className="flex min-h-[min(480px,50vh)] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white p-8 text-center text-sm text-zinc-400 lg:min-h-0 lg:flex-1">
              {pickedFileName
                ? t("pdfFileReady", { name: pickedFileName })
                : t("pdfPlaceholder")}
            </div>
          </div>
        </section>

        {/* 右侧：摘要 + 推荐问题 + 对话 */}
        <aside className="flex w-full shrink-0 flex-col border-t border-[var(--workspace-border)] bg-white lg:w-[min(100%,400px)] lg:border-l lg:border-t-0 xl:w-[420px]">
          <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--workspace-red)] text-sm font-bold text-white">
                P
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-zinc-900">{t("summaryTitle")}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600">
                  <li>{t("summaryBullet1")}</li>
                  <li>{t("summaryBullet2")}</li>
                  <li>{t("summaryBullet3")}</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50/60">
              <button
                type="button"
                onClick={() => setSuggestedOpen((o) => !o)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-zinc-700"
              >
                {t("suggestedQuestions")}
                <svg
                  className={[
                    "h-5 w-5 shrink-0 text-zinc-400 transition",
                    suggestedOpen ? "rotate-180" : "",
                  ].join(" ")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {suggestedOpen && (
                <div className="space-y-2 border-t border-zinc-200 bg-white px-3 pb-3 pt-2">
                  {questions.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className="flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-white px-3 py-2.5 text-left text-sm text-zinc-700 shadow-sm transition hover:border-zinc-200 hover:bg-zinc-50"
                      onClick={() => setMessage(t(key))}
                    >
                      <span className="line-clamp-2">{t(key)}</span>
                      <svg
                        className="h-4 w-4 shrink-0 text-zinc-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0 border-t border-[var(--workspace-border)] bg-white p-3 lg:p-4">
            <div className="relative flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-1.5 pl-3 shadow-inner">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={t("chatPlaceholder")}
                rows={1}
                className="max-h-32 min-h-[44px] w-full resize-none bg-transparent py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-sm transition hover:opacity-90"
                aria-label={t("send")}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
