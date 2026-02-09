import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ setIsSidebarOpen }) => {
  console.log(setIsSidebarOpen);
  console.log("sidebar");
  const routerParams = useParams();
  const status = routerParams.status;
  const category = routerParams.category || "All";
  const [term, setTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    /* we are in orders page*/
    if (status) {
      router.push(`/myOrders/${status}?query=${term}`);
    } else {
      if (term) params.set("query", term);
      else params.delete("query");
      router.push(`/search/${category}/?${params.toString()}`);
    }
    if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };
  return (
    <span className="flex items-center">
      <form onSubmit={handleSearch} className="w-fit">
        <input
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for products..."
          className="flex flex-1 w-80 border  border-neutral-200/10 px-2 py-2 rounded-md focus:outline-gray-400/40"
        />
      </form>

      <span className=" relative -left-7 text-center">
        <CiSearch className="text-xl" />
      </span>
    </span>
  );
};

export default SearchBar;
