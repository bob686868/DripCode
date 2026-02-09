import React from "react";
import Link from "next/link";

const RightSideBar = ({ active, category, query }) => {
  /*TODO  change querySrting and then pass it to the link*/
  const data = [
    "Relevance",
    "Trending",
    "Latest arrivals",
    "Price: Low to high",
    "Price: High to low",
  ];
  const queryString= query ? `&query=${query}` : ""
  return (
    <div className="min-w-32 flex-col pr-2 text-sm sm:flex hidden">
      <div className="text-sm text-neutral-400">Sort by</div>
      <div className="flex flex-col gap-y-2">
        {data.map((name, id) => (
          <Link
            className={`transition duration-100 cursor-pointer inline w-fit text-neutral-100 hover:border-b border border-transparent hover:border-b-neutral-100  ${name == active ? "border-b border-b-neutral-100" : ""} text-neutral-100 hover:border-b hover:border-b-neutral-100`}
            key={id}
            href={`/search/${category}?sort=${name}${queryString}`}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
