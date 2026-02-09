// "use client";
// import SearchBar from "./SearchBar";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import Link from "next/link";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Sidebar from "./Sidebar";
// import CartSideBar from "./CartSideBar";
// import { useParams, useSearchParams } from "next/navigation";
// import { useCartStore } from "../../stores/useCartStore";

// const Navbar = () => {
//   // const searchParams=useSearchParams()
//   // const sort=searchParams.get('sort')
//   // const q=searchParams.get('a')
//   const openCart = useCartStore((state) => state.openCart);
//   const isCartOpen = useCartStore((state) => state.isCartOpen);
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
//   const params = useParams();

//   useEffect(() => {
//     if (isCartOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "unset";
//   }, [isCartOpen]);
//   return (
//     <div>
//       <div className="flex bg-neutral-900 items-center justify-between p-4 text-neutral-400">
//         {/*left*/}
//         <div>
//           <div
//             className="inline-block z-9999 sm:hidden p-3 border border-neutral-100/20 rounded-md cursor-pointer"
//             onClick={() => setIsSideBarOpen(true)}
//           >
//             <GiHamburgerMenu />
//             <div
//               className={`${!isSideBarOpen ? "-translate-x-full z-9999 duration-200" : "translate-x-0 duration-400"} transition fixed left-0 top-0`}
//             >
//               <Sidebar setIsSidebarOpen={setIsSideBarOpen}></Sidebar>
//             </div>
//           </div>
//           <div className=" gap-x-4 hidden sm:flex">
//             <Link
//               href="/search/All"
//               className={`${params.category == "All" ? "border-b border-neutral-100 text-neutral-100" : "text-neutral-400 hover:border-b hover:border-b-neutral-100 hover:text-neutral-100"} h-fit transition duration-100 p-0  cursor-pointer `}
//             >
//               All
//             </Link>
//             <Link
//               href="/search/Shirts"
//               className={`${params.category == "Shirts" ? "border-b border-neutral-100 text-neutral-100" : "text-neutral-400 hover:border-b hover:border-b-neutral-100 hover:text-neutral-100"} h-fit transition duration-100 p-0  cursor-pointer `}
//             >
//               Shirts
//             </Link>
//             <Link
//               href="/search/Stickers"
//               className={`${params.category == "Stickers" ? "border-b border-neutral-100 text-neutral-100" : "text-neutral-400 hover:border-b hover:border-b-neutral-100 hover:text-neutral-100"} h-fit transition duration-100 p-0  cursor-pointer `}
//             >
//               Stickers
//             </Link>
//             <Link
//               href="/myOrders/Shipping"
//               className={`${params.status ? "border-b border-neutral-100 text-neutral-100" : "text-neutral-400 hover:border-b hover:border-b-neutral-100 hover:text-neutral-100"} h-fit transition duration-100 p-0  cursor-pointer `}
//             >
//               My Orders
//             </Link>
//           </div>
//         </div>

//         {/*middle*/}
//         <div>
//           <div className="text-neutral-100 font-semibold text-lg sm:hidden">
//             Acme Store
//           </div>
//           <div className="hidden sm:block">
//             <SearchBar></SearchBar>
//           </div>
//         </div>

//         {/*right*/}
//         <span
//           className="border  border-neutral-200/30 p-3 group  cursor-pointer hover:scale-105 rounded-md "
//           onClick={openCart}
//         >
//           <AiOutlineShoppingCart className="text-neutral-200  group-hover:text-neutral-100" />
//         </span>
//         <div
//           className={`fixed inset-0 transition z-999 ${!isCartOpen ? "translate-x-full" : " "}`}
//         >
//           <CartSideBar></CartSideBar>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  UserButton, 
  useUser 
} from "@clerk/nextjs";

import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import CartSideBar from "./CartSideBar";
import { useCartStore } from "../../stores/useCartStore";

const Navbar = () => {
  const { user } = useUser();
  const params = useParams();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  
  const openCart = useCartStore((state) => state.openCart);
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
  }, [isCartOpen]);

  // Logic for conditional Order route
  const getOrderRoute = () => {
    if (!user) return null;
    const role = user.publicMetadata.role; // Ensure you set these in Clerk Dashboard
    
    if (role === "admin") return { label: "Admin Orders", href: "/orders/All" };
    if (role === "delivery") return { label: "Delivery Orders", href: "/delivery/orders" };
    return { label: "My Orders", href: "/myOrders/Shipping" };
  };

  const orderLink = getOrderRoute();

  return (
    <nav className="sticky top-0 z-50 w-full  bg-neutral-900 text-neutral-400">
      <div className="flex items-center justify-between p-4 w-full mx-auto">
        
        {/* LEFT: Mobile Menu & Desktop Links */}
        <div className="flex items-center gap-x-6">
          <button 
            className="sm:hidden p-2 border border-neutral-100/20 rounded-md"
            onClick={() => setIsSideBarOpen(true)}
          >
            <GiHamburgerMenu />
          </button>

          <div className="hidden sm:flex gap-x-5">
            {["All", "Shirts", "Stickers"].map((cat) => (
              <NavLink key={cat} href={`/search/${cat}`} active={params.category === cat}>
                {cat}
              </NavLink>
            ))}
            {orderLink && (
              <NavLink href={orderLink.href} active={!!params.status}>
                {orderLink.label}
              </NavLink>
            )}
          </div>
        </div>

        {/* MIDDLE: Search or Branding */}
        <div className="flex-1 max-w-md px-4">
          <div className="text-neutral-100 font-bold text-xl sm:hidden text-center">
            ACME
          </div>
          <div className="hidden sm:block">
            <SearchBar />
          </div>
        </div>

        {/* RIGHT: Auth & Cart */}
        <div className="flex items-center gap-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-white transition">Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <button
            className="border border-neutral-200/30 p-2.5 hover:scale-105 rounded-md transition relative"
            onClick={openCart}
          >
            <AiOutlineShoppingCart className="text-xl text-neutral-200" />
          </button>
        </div>
      </div>

      {/* Sidebars */}
      <div className={`fixed inset-0 z-[100] transition-transform ${!isSideBarOpen ? "-translate-x-full" : "translate-x-0"}`}>
        <Sidebar setIsSidebarOpen={setIsSideBarOpen} />
      </div>
      
      <div className={`fixed inset-0 z-[100] transition-transform ${!isCartOpen ? "translate-x-full" : "translate-x-0"}`}>
        <CartSideBar />
      </div>
    </nav>
  );
};

// Small helper component for clean links
const NavLink = ({ href, children, active }) => (
  <Link
    href={href}
    className={`text-sm transition duration-200 ${
      active ? "text-neutral-100 border-b border-white" : "hover:text-neutral-100"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;