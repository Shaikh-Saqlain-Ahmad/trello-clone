import { authMiddleware, clerkMiddleware, createRouteMatcher, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    // add protected routes here
    
  ]);
  // export default clerkMiddleware((auth, req) => {
  //   if (isProtectedRoute(req)) auth().protect();
   
  // });
  export default authMiddleware({
    publicRoutes:['/'],
    afterAuth(auth,req){
      if(auth.userId && auth.isPublicRoute){
        let path=`/organization/${auth.orgId}`;
        if(auth.orgId){
          path=`/organinzation/${auth.orgId}`
  
        }
        const orgSelection=new URL(path,req.url)
        return NextResponse.redirect(orgSelection)
      }
      if(!auth.userId && !auth.isPublicRoute){
        return redirectToSignIn({returnBackUrl:req.url})

      }
      if(auth.userId && auth.isPublicRoute && req.nextUrl.pathname!=="/select-org"){
        const orgSelection=new URL("/select-org",req.url);
        return NextResponse.redirect(orgSelection)
      }
      
    }

  })
// export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};