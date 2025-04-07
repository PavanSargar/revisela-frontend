"use client";
import React from "react";
import { usePathname } from "next/navigation";
import RootNavbar from "./navbar";
import Sidebar from "./sidebar";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const pathname = usePathname();

  // Simple check if we're on an auth page
  const isOnAuthPage = pathname.startsWith("/auth");

  return (
    <>
      {!isOnAuthPage && <RootNavbar />}
      <div className="flex bg-[#FAFAFA]">
        {!isOnAuthPage && <Sidebar />}
        <div className={cn("", !isOnAuthPage && "ml-5")}>{children}</div>
      </div>
    </>
  );
};

export default LayoutWrapper;
