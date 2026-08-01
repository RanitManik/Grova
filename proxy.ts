import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes requiring authentication
const protectedRoutes = [
  "/dashboard",
  "/goals",
  "/analytics",
  "/settings",
  "/onboarding",
];

// Auth routes (only for unauthenticated users)
const authRoutes = ["/login"];

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Check for NextAuth / Auth.js session cookies
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthenticated = !!sessionToken;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 1. Unauthenticated users accessing protected routes -> redirect to /login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users visiting /login -> redirect to /dashboard ONLY IF
  // they are not being explicitly redirected back by server auth failure (has callbackUrl or error)
  const isServerAuthRedirect =
    searchParams.has("callbackUrl") || searchParams.has("error");

  if (isAuthRoute && isAuthenticated && !isServerAuthRedirect) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes handle their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - static assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
