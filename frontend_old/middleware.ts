import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(
    request: NextRequest
) {

    const protectedRoutes = [
        "/dashboard",
        "/assets",
        "/analytics",
        "/ai",
        "/reports",
        "/maintenance"
    ];


    const path = request.nextUrl.pathname;


    const isProtected =
        protectedRoutes.some(
            route => path.startsWith(route)
        );


    if (!isProtected) {

        return NextResponse.next();

    }


    const hasAuthCookie =
        request.cookies
            .getAll()
            .some(
                cookie =>
                    cookie.name.includes("auth-token") ||
                    cookie.name.startsWith("sb-")
            );


    if (!hasAuthCookie) {

        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );

    }


    return NextResponse.next();

}



export const config = {

    matcher: [
        "/dashboard/:path*",
        "/assets/:path*",
        "/analytics/:path*",
        "/ai/:path*",
        "/reports/:path*",
        "/maintenance/:path*"
    ]

};