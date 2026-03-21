import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroDropzone } from "@/components/home/HeroDropzone";
import { UrlInputRow } from "@/components/home/UrlInputRow";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function FeatureCard({
  title,
  badge,
  description,
  children,
}: {
  title: string;
  badge: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm ring-1 ring-zinc-100/80 transition hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-[var(--accent)]">
        {children}
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-500">
          {badge}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
    </article>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("home");
  const tFeat = await getTranslations("features");
  const tBadge = await getTranslations("badge");
  const tFooter = await getTranslations("footer");

  return (
    <div className="flex min-h-full flex-col bg-[var(--background)]">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 font-semibold text-zinc-900"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
              AI
            </span>
            <span className="truncate">{tNav("brand")}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 sm:flex md:gap-8">
            <a href="#features" className="transition hover:text-zinc-900">
              {tNav("features")}
            </a>
            <span className="cursor-not-allowed text-zinc-400" title={tNav("comingSoon")}>
              {tNav("pricing")}
            </span>
            <span className="cursor-not-allowed text-zinc-400" title={tNav("comingSoon")}>
              {tNav("myDocs")}
            </span>
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              className="rounded-full bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 sm:px-4"
            >
              {tNav("login")}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            {tHome("mvp")}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {tHome("headline")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-zinc-600 sm:text-lg">
            {tHome("subhead")}
          </p>

          <div className="mx-auto mt-12 max-w-xl">
            <HeroDropzone />
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <UrlInputRow />
          </div>
        </section>

        <section id="features" className="border-t border-zinc-200/80 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-xl font-semibold text-zinc-900">
              {tHome("sectionTitle")}
            </h2>
            <p className="mt-2 text-center text-sm text-zinc-500">{tHome("sectionSubtitle")}</p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title={tFeat("summary.title")}
                badge={tBadge("p0")}
                description={tFeat("summary.desc")}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 17l.9-5.4-3.9-3.8 5.4-.8L12 2z" />
                </svg>
              </FeatureCard>
              <FeatureCard
                title={tFeat("chat.title")}
                badge={tBadge("p0")}
                description={tFeat("chat.desc")}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </FeatureCard>
              <FeatureCard
                title={tFeat("ocr.title")}
                badge={tBadge("p0")}
                description={tFeat("ocr.desc")}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5v13.5"
                  />
                </svg>
              </FeatureCard>
            </div>

            <h3 className="mt-16 text-center text-sm font-medium text-zinc-500">
              {tHome("moreTitle")}
            </h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <FeatureCard
                title={tFeat("tools.title")}
                badge={tBadge("p1")}
                description={tFeat("tools.desc")}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </FeatureCard>
              <FeatureCard
                title={tFeat("security.title")}
                badge={tBadge("p1")}
                description={tFeat("security.desc")}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </FeatureCard>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6">
          <p>{tFooter("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-zinc-800">
              {tFooter("privacy")}
            </a>
            <a href="#" className="hover:text-zinc-800">
              {tFooter("terms")}
            </a>
            <a href="#" className="hover:text-zinc-800">
              {tFooter("contact")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
