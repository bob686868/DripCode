import React,{Suspense} from "react";
import LeftSideBar from "../../../components/LeftSideBar";
import RightSideBar from "../../../components/RightSideBar";
import DropDownMenu from "../../../components/DropDownMenu";
import Fetcher from "./Fetcher";
import SkeletonGrid from "./SkeletonGrid";

const page = async ({ params, searchParams }) => {
  const { category } = await params;
  const query = await searchParams;
  const queryString = new URLSearchParams(query).toString();
  const categories = [
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
  const sortOptions = [
    "Relevance",
    "Trending",
    "Latest arrivals",
    "Price: Low to high",
    "Price: High to low",
  ];
  return (
    <div className="flex justify-between bg-neutral-900">
      
      <LeftSideBar active={category} sort={query.sort}></LeftSideBar>
      <div className="px-5 w-full ">
        <div className="mb-4 sm:hidden">
            <DropDownMenu
              category={category}
              data={categories}
              isCategory={true}
              searchParams={queryString}
            ></DropDownMenu>
          </div>
          <div className="mb-4 sm:hidden">
            <DropDownMenu
              category={category}
              data={sortOptions}
              isCategory={false}
              searchParams={query}
            ></DropDownMenu>
        </div>
        <Suspense key={`${category}-${queryString}`} fallback={<SkeletonGrid/>}>
          <Fetcher category={category} sortBy={query.sort} query={query.query}></Fetcher>
        </Suspense>
      </div>
      <RightSideBar active={query.sort} category={category} query={query.query} ></RightSideBar>
    </div>
  );
};

export default page;
