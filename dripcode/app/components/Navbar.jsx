"use client";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
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
    if (role === "delivery")
      return { label: "Delivery Orders", href: "/delivery/orders" };
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
              <NavLink
                key={cat}
                href={`/search/${cat}`}
                active={params.category === cat}
              >
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
            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse bg-neutral-800 rounded-md" />
              }
            >
              <SearchBar />
            </Suspense>
          </div>
        </div>

        {/* RIGHT: Auth & Cart */}
        <div className="flex items-center gap-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-white transition">
                Sign In
              </button>
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
      <div
        className={`fixed inset-0 z-[100] transition-transform ${!isSideBarOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        <Sidebar setIsSidebarOpen={setIsSideBarOpen} />
      </div>

      <div
        className={`fixed inset-0 z-[100] transition-transform ${!isCartOpen ? "translate-x-full" : "translate-x-0"}`}
      >
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
      active
        ? "text-neutral-100 border-b border-white"
        : "hover:text-neutral-100"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
