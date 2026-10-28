import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DeliveryLayout = async ({ children }) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  if (role !== "delivery" && role !== "admin") redirect("/");

  return <div className="min-h-screen bg-neutral-950">{children}</div>;
};

export default DeliveryLayout;
