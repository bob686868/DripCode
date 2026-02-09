// "use client";

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
// import { useMediaQuery } from "@/hooks/use-media-query";

// export default function Layout({ children }) {
  //   const isDesktop = useMediaQuery("(min-width: 768px)");
  
  //   return (
    //     <html className="dark">
    //       <body className="bg-background text-foreground">
    //         <SidebarProvider
    //           defaultOpen={isDesktop}
    //           style={{ "--sidebar-width": "16rem" }}
//         >
//           <div className="flex min-h-screen w-full">
//             <AppSidebar />

//             <main className="flex-1 flex flex-col">
//               {!isDesktop && (
//                 <header className="flex h-16 items-center border-b px-4">
//                   <SidebarTrigger />
//                 </header>
//               )}

//               <div className="p-4 md:p-8">{children}</div>
//             </main>
//           </div>
//         </SidebarProvider>
//       </body>
//     </html>
//   );
// }
import React from 'react'
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import "../globals.css";

const layout =async ({children}) => {
  const {sessionClaims} = await auth()
  const role=sessionClaims?.metadata?.role
  
  if(role!="admin")redirect("/")
    return (
    <html className="bg-neutral-900">
      <body>{children}</body>
    </html>
  )
}

export default layout

