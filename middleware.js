import { auth } from "@/auth";
import { publicRoutes, authRoutes, authPrefix, DEFAULT_LOGIN_REDIRECT} from "@/routes";

export default auth ((req)=> {
  const {nextUrl}=req;
  const isLoggedIn=!!req.auth; //false
  const isApiAuthRoute = nextUrl.pathname.startsWith(authPrefix); //string
const isPublicRoute = publicRoutes.includes(nextUrl.pathname); //array
const isAuthRoute = authRoutes.includes(nextUrl.pathname);

if(isApiAuthRoute) {
  return null;
}

if(isAuthRoute) {
  if(isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  return null;
}

if(!isLoggedIn && !isPublicRoute) {
  return Response.redirect(new URL("/auth/login", nextUrl));
}

return null; //allow any other route

//   const isLogIn=!!auth.req;
// console.log("ROUTE:", req.nextUrl.pathname);
// console.log("isLoggedIn:", isLogIn);
})

export const config = {
  //matcher: ["/auth/login", "/auth/register"]
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};