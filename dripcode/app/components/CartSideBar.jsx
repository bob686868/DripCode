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
    <div className="fixed inset-0   flex w-screen h-screen">
      <div className="w-[70vw] bg-neutral-900/20 hidden lg:block"></div>
      <div className=" w-full px-4  lg:w-[30vw] border border-neutral-400/40 bg-neutral-950 h-screen flex flex-col  inset-0 z-9999 p-3 ">
        <div className="flex justify-between pt-3 items-center">
          <span className="text-neutral-100 font-semibold text-2xl ">
            My Cart
          </span>
          <div
            className="p-3 mb-3 w-fit rounded-md border border-neutral-100/20 text-neutral-100 cursor-pointer"
            onClick={(e) => {
              closeCart();
              e.stopPropagation();
            }}
          >
            <IoMdClose></IoMdClose>
          </div>
        </div>
        {(!optimisticCartItems || optimisticCartItems.length == 0) && (
          <div className="mt-20 flex flex-col text-neutral-100  items-center">
            <AiOutlineShoppingCart className="text-neutral-200  size-20" />
            <div className="text-2xl mt-8">Your cart is empty</div>
          </div>
        )}
        {optimisticCartItems && optimisticCartItems.length > 0 && (
          <div className="mt-6 flex flex-col gap-y-3">
            {optimisticCartItems.map((item) => (
              <CartItem
                update={updateCartItems}
                data={item}
                key={item.product.id}
              ></CartItem>
            ))}
          </div>
        )}
        {optimisticCartItems && optimisticCartItems.length > 0 && (
          <div className="mt-auto flex flex-col gap-y-3">
            <div className="flex justify-between pb-1 border-b border-neutral-400/30">
              <span className="text-neutral-400 text-sm">Taxes</span>
              <span className="text-neutral-100">$0.00 USD</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-neutral-400/30">
              <span className="text-neutral-400 text-sm">Shipping</span>
              <span className="text-neutral-400">Calculated at checkout</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-neutral-400/30">
              <span className="text-neutral-400 text-sm">Total</span>
              <span className="text-neutral-100">${total.toFixed(2)} USD</span>
            </div>
            <form action={handleCheckout} className="mt-3 mb-2">
              <SubmitButton
                text="Proceed to Checkout"
                loadingText="Proceeding ..."
              ></SubmitButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSideBar;
