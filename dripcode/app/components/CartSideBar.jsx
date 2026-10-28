"use client";
import React from "react";
import { useOptimistic, useTransition, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartItem from "./CartItem";
import { updateQuantity, getCartItems } from "@/actions/cart";
import { useAuth } from "@clerk/nextjs";
import { useCartStore } from "@/stores/useCartStore";
import SubmitButton from "../components/SubmitButton";
import { createOrder } from "../../actions/orders";
import { createCheckoutSession } from "../../actions/stripe";
import { toast } from "sonner";

const CartSideBar = () => {
  let { userId, isLoaded } = useAuth();
  const closeCart = useCartStore((state) => state.closeCart);
  const [cartItems, setCartItems] = useState({ cartItems: [] });
  const [isPending, startTransition] = useTransition();
  const [optimisticCartItems, setOptimisticCartItems] = useOptimistic(
    cartItems?.cartItems,
    (state, { cartItemId, newQuantity }) => {
      if (newQuantity <= 0)
        return state.filter((item) => item.id != cartItemId);
      return state.map((item) =>
        item.id == cartItemId ? { ...item, quantity: newQuantity } : item,
      );
    },
  );
  const total = optimisticCartItems?.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0,
  );
  async function updateCartItems({ cartItemId, newQuantity }) {
    startTransition(async () => {
      setOptimisticCartItems({ cartItemId, newQuantity });
      await updateQuantity({ cartItemId, quantity: newQuantity });
      await fetcher();
    });
  }
  const fetcher = async () => {
    if (isLoaded && userId) {
      let res = await getCartItems(userId);
      setCartItems(res?.cartItems);
    }
  };
  useEffect(() => {
    fetcher();
    window.addEventListener("cart-updated", fetcher);

    return () => window.removeEventListener("cart-updated", fetcher);
  }, [userId, isLoaded]);
  const handleCheckout = async () => {
    const res = await createCheckoutSession();
    if (res?.error) {
      toast.error(res.error);
    }
  };
  //    cartItems=cartItems.cartItems[0]
  return (
    <div className="fixed inset-0 flex justify-end w-screen h-screen">
      {/* Clickable Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={closeCart}
      />

      {/* Cart Content Drawer */}
      <div className="relative w-full max-w-md bg-neutral-950 h-screen flex flex-col z-10 p-4 border-l border-neutral-800 shadow-2xl">
        <div className="flex justify-between pt-2 pb-4 items-center border-b border-neutral-800">
          <span className="text-neutral-100 font-semibold text-xl tracking-tight">
            My Cart
          </span>
          <button
            className="p-2 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white cursor-pointer transition"
            onClick={(e) => {
              closeCart();
              e.stopPropagation();
            }}
          >
            <IoMdClose className="size-5" />
          </button>
        </div>

        {(!optimisticCartItems || optimisticCartItems.length === 0) && (
          <div className="my-auto flex flex-col text-neutral-100 items-center justify-center p-6 text-center">
            <AiOutlineShoppingCart className="text-neutral-600 size-20 mb-4" />
            <div className="text-xl font-medium text-neutral-300">Your cart is empty</div>
            <p className="text-sm text-neutral-500 mt-1">Add items to get started.</p>
          </div>
        )}

        {optimisticCartItems && optimisticCartItems.length > 0 && (
          <div className="mt-4 flex flex-col gap-y-3 overflow-y-auto flex-1 pr-1">
            {optimisticCartItems.map((item) => (
              <CartItem
                update={updateCartItems}
                data={item}
                key={item.id}
              />
            ))}
          </div>
        )}

        {optimisticCartItems && optimisticCartItems.length > 0 && (
          <div className="mt-auto pt-4 border-t border-neutral-800 flex flex-col gap-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Taxes</span>
              <span className="text-neutral-100 font-mono">$0.00 USD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Shipping</span>
              <span className="text-neutral-400">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-1 border-t border-neutral-800/80">
              <span className="text-neutral-200">Total</span>
              <span className="text-neutral-100 font-mono">${(total || 0).toFixed(2)} USD</span>
            </div>
            <form action={handleCheckout} className="mt-2">
              <SubmitButton
                text="Proceed to Checkout"
                loadingText="Proceeding ..."
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSideBar;
