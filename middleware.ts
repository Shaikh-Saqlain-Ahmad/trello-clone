import { authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/select-org",
  "/organization/:orgId*"
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId } = auth();

  // Redirect to sign-in if the user is not authenticated and the route is protected
  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // Redirect to select organization page if the user is authenticated but has no organization selected
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Redirect to organization page if the user has selected an organization and is trying to access select-org
  if (userId && orgId && req.nextUrl.pathname === "/select-org") {
    const orgPage = new URL(`/organization/${orgId}`, req.url);
    return NextResponse.redirect(orgPage);
  }

  // Continue with the request if none of the above conditions are met
  return NextResponse.next();
});

// Export matcher configuration
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
// import { authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // Define protected routes
// const isProtectedRoute = createRouteMatcher([
//   "/select-org",
//   "/organization/:orgId*"
// ]);

// export default clerkMiddleware((auth, req) => {
//   const { userId, orgId } = auth();

//   // Redirect to sign-in if the user is not authenticated and the route is protected
//   if (!userId && isProtectedRoute(req)) {
//     return auth().redirectToSignIn({ returnBackUrl: req.url });
//   }

//   // Redirect to select organization page if the user is authenticated but has no organization selected
//   if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
//     const orgSelection = new URL("/select-org", req.url);
//     return NextResponse.redirect(orgSelection);
//   }

//   // Redirect to organization page if the user has selected an organization
//   if (userId && orgId && req.nextUrl.pathname  === "/select-org" && req.url===`/organization/${orgId}`) {
//     const orgPage = new URL(`/organization/${orgId}`, req.url);
//     return NextResponse.redirect(orgPage);
//   }
  

//   if(userId && !isProtectedRoute(req)){
//     let path ='select/org';
//     if(orgId){
//       path=`/organization/${orgId}`;
//       const orgSelection=new URL(path,req.url);
//       return NextResponse.redirect(orgSelection)
//     }
//   }

//   // Continue with the request if none of the above conditions are met
//   return NextResponse.next();
// });

// // Export matcher configuration
// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };