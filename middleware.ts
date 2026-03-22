import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Cloudflare Workers: keep middleware on the Edge runtime (Node middleware is not an option here).
export const runtime = "experimental-edge";

export default createMiddleware(routing);
