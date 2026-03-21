"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

const ACCEPT =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/png,image/jpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const MAX_BYTES = 100 * 1024 * 1024;

type UploadFileModalProps = {
  open: boolean;
  onClose: () => void;
  onFilesAccepted?: (files: File[]) => void;
};

export function UploadFileModal({ open, onClose, onFilesAccepted }: UploadFileModalProps) {
  const t = useTranslations("workspace");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      const file = list?.[0];
      if (!file) return;
      if (file.size > MAX_BYTES) {
        return;
      }
      onFilesAccepted?.([file]);
      onClose();
    },
    [onFilesAccepted, onClose],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label={t("uploadModal.closeDialog")}
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-[#faf9f7] shadow-2xl ring-1 ring-zinc-200/80">
        <div className="grid max-h-[90vh] grid-cols-1 gap-0 md:grid-cols-2 md:gap-0">
          {/* 左栏 */}
          <div className="flex flex-col border-b border-zinc-200/80 p-6 md:border-b-0 md:border-r md:p-8">
            <h2
              id="upload-modal-title"
              className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl"
            >
              {t("uploadModal.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{t("uploadModal.description")}</p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex w-full items-center gap-3 rounded-xl border-2 border-[var(--upload-purple)] bg-white px-4 py-3.5 text-left text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-[#5b36b8]"
              >
                <svg
                  className="h-6 w-6 shrink-0 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>
                {t("uploadModal.fromDevice")}
              </button>

              <p className="py-1 text-center text-xs font-medium uppercase tracking-wider text-zinc-400">
                {t("uploadModal.or")}
              </p>

              <button
                type="button"
                disabled
                title={t("uploadModal.comingSoon")}
                className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-zinc-400 opacity-80"
              >
                <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M12 10.2v3.6l3.8 2.2 3.1-5.4-3.1-5.4z" />
                  <path fill="#34A853" d="M12 10.2L8.2 8l-3.1 5.4 3.1 5.4L12 16.8z" />
                  <path fill="#FBBC04" d="M8.2 8L12 5.8 15.8 8l-3.8 2.2z" />
                  <path fill="#EA4335" d="M8.2 16l3.8-2.2v-3.6L8.2 8z" />
                </svg>
                {t("uploadModal.fromDrive")}
              </button>

              <button
                type="button"
                disabled
                title={t("uploadModal.comingSoon")}
                className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-zinc-400 opacity-80"
              >
                <svg className="h-6 w-6 shrink-0 text-[#0061FF]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6 3l6 3.75L6 10.5 0 6.75 6 3zm12 0l6 3.75-6 3.75-6-3.75L18 3zM6 13.5l6 3.75 6-3.75-6-3.75-6 3.75zm12 0L24 17.25 18 21l-6-3.75 6-3.75z" />
                </svg>
                {t("uploadModal.fromDropbox")}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-auto pt-8 text-center text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-800 hover:underline"
            >
              {t("uploadModal.skip")}
            </button>
          </div>

          {/* 右栏：拖拽区 */}
          <div className="flex flex-col bg-[var(--upload-purple-soft)] p-6 md:p-8">
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={[
                "flex min-h-[280px] flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 transition-colors md:min-h-[360px]",
                dragOver ? "border-[var(--upload-purple)] bg-white/60" : "border-zinc-400/60 bg-white/40",
              ].join(" ")}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="sr-only"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {/* 三文档示意 */}
              <div className="relative mb-6 h-28 w-40 shrink-0">
                <div className="absolute left-0 top-2 w-16 rotate-[-8deg] rounded-md border border-blue-200 bg-blue-50 px-1 py-6 text-center text-[9px] font-bold text-blue-600 shadow-sm">
                  WORD
                </div>
                <div className="absolute left-1/2 top-0 z-10 w-16 -translate-x-1/2 rotate-0 rounded-md border border-red-200 bg-red-50 px-1 py-8 text-center text-[9px] font-bold text-red-600 shadow-md">
                  PDF
                </div>
                <div className="absolute right-0 top-2 w-16 rotate-[8deg] rounded-md border border-purple-200 bg-purple-50 px-1 py-6 text-center text-[9px] font-bold text-purple-600 shadow-sm">
                  IMAGE
                </div>
              </div>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--upload-purple)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                {t("uploadModal.uploadFiles")}
              </button>

              <p className="mt-4 text-center text-xs text-zinc-600">{t("uploadModal.sizeLimit")}</p>
              <p className="mt-1 max-w-xs text-center text-xs leading-relaxed text-zinc-500">{t("uploadModal.formats")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
