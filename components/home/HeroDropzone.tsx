"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCallback, useRef, useState } from "react";

type UploadPhase = "idle" | "uploading" | "parsing" | "done";

export function HeroDropzone() {
  const t = useTranslations("hero");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);

  const runProgress = useCallback(() => {
    setPhase("uploading");
    setProgress(0);
    let current = 0;
    const id = window.setInterval(() => {
      current += Math.random() * 7 + 2;
      if (current >= 48) setPhase("parsing");
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setPhase("done");
        window.clearInterval(id);
        window.setTimeout(() => router.push("/workspace"), 450);
      } else {
        setProgress(Math.round(current));
      }
    }, 90);
  }, [router]);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return;
    }
    runProgress();
  };

  return (
    <>
      {phase !== "idle" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
            <p className="text-center text-sm font-medium text-zinc-800">
              {phase === "uploading" &&
                t("uploading", { percent: Math.min(progress, 47) })}
              {phase === "parsing" && t("parsing", { percent: progress })}
              {phase === "done" && t("done")}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-150 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={[
          "group relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors",
          isDragging
            ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,white)]"
            : "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300 hover:bg-zinc-50",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100">
          <svg
            className="h-8 w-8 text-[var(--accent)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <p className="text-center text-lg font-medium text-zinc-900">{t("dropTitle")}</p>
        <p className="mt-2 text-center text-sm text-zinc-500">
          {t("or")}{" "}
          <span className="font-medium text-[var(--accent)] group-hover:underline">
            {t("clickUpload")}
          </span>
        </p>
        <p className="mt-6 text-center text-xs text-zinc-400">{t("hints")}</p>
      </div>
    </>
  );
}
