import { setRequestLocale } from "next-intl/server";
import { PdfWorkspace } from "@/components/workspace/PdfWorkspace";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PdfWorkspace />;
}
