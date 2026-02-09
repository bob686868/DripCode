import Image from "next/image";
import Products from "../components/Products";
import { getProducts } from "../../actions/stock";
import Carousel from "../components/Carousel";
import GridDisplay from "../components/GridDisplay";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
export default async function Home() {
  const { products } = await getProducts();
  return (
    <div className="dark:bg-neutral-900 text-neutral-100">
      <SignedOut>
        <SignInButton mode="modal" />
        </SignedOut>
        <div className="flex justify-end items-center pb-2 px-2">

        <UserButton afterSignOutUrl="/" />
        </div>
      <GridDisplay products={products && products.slice(0, 3)} />
      <div className="text-neutral-100 font-bold mt-12 mb-10 pl-4 pt-6 border-t border-neutral-400/40  text-5xl">
        Best Sellers
      </div>
      fsda
      <Carousel products={products && products.slice(3)} />
    </div>
  );
}
