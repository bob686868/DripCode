import React from "react";
import Link from "next/link";
const Footer = () => {
  const pages=["Home","About","Terms-And-Conditions", "Shipping-And-Return-Policy",'Privacy-And-Policy',"FAQ"]
  return (
    <div className="text-neutral-400 pt-5 bg-neutral-900">

    <div className="flex flex-col gap-x-7 sm:flex-row py-7 px-3 border border-neutral-100/20">
      <Link className="cursor-pointer mb-2 text-neutral-100" href="/">ACME STORE</Link>
      <div className="flex flex-col gap-x-7   text-md">
        {
          pages.map((name,id)=>(
            <Link key={id} href={`/${name}`} className="cursor-pointer hover:underline hover:decoration-white hover:text-neutral-100 pb-3">
              {name}
            </Link>
          ))
        }
      </div>
    </div>
    <div className="p-4">

    © 2023-2026 ACME, Inc. All rights reserved.
View the source
    </div>
  </div>
  );
};

export default Footer;
