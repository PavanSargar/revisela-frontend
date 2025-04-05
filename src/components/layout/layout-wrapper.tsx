"use client";
import React from "react";
import { usePathname } from "next/navigation";
import RootNavbar from "./navbar";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/auth");

  return (
    <>
      {!isAuthPage && <RootNavbar />}
      <div className="flex bg-[#FAFAFA]">
        {!isAuthPage && <Sidebar />}
        <div className="mt-20">{children}</div>
      </div>
    </>
  );
};

export default LayoutWrapper;
