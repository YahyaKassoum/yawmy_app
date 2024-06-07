import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";


const ProtectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recording',
    '/personal-room',
    '/meeting(.*)'
])
export default clerkMiddleware((auth,req)=>{
    if (ProtectedRoutes(req)) auth().protect()

});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};