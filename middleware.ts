import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Cloudflare Workers 需要 Edge；Next 16 此处使用 experimental-edge */
export const runtime = "experimental-edge";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
