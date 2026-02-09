import React from "react";
import Link from 'next/link'
const LeftSideBar = ({active='All',sort}) => {
  const data = [
    "All",
    "Bags",
    "Drinkware",
    "Electronics",
    "Footware",
    "Headwear",
    "Hoodies",
    "Jackets",
    "Kids",
    "Pets",
    "Shirts",
    "Stickers",
  ];
  const sortString= sort ?  `?sort=${sort}` : ""
  return (
    <div className="text-sm w-[20%] flex-col gap-y-2 pl-2 hidden sm:flex">
      <div className="text-sm text-neutral-400">Collections</div>
      <div className="flex flex-col gap-y-2">
        {data.map((name,id)=>(
            <Link className={`transition duration-100 cursor-pointer inline w-fit text-neutral-100 hover:border-b border border-transparent hover:border-b-neutral-100 ${name == active ? "border-b border-b-neutral-100" : ""} `} key={id} href={`/search/${name}${sortString}`}>{name}</Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
