import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const AdminLayout = async ({ children }) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  if (role !== "admin") redirect("/");

  return <div className="min-h-screen bg-neutral-900">{children}</div>;
};

export default AdminLayout;
