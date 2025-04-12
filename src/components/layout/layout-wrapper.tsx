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
  const isOnDashboardPage = pathname.startsWith("/dashboard");

  return (
    <>
      {!isOnAuthPage && isOnDashboardPage && <RootNavbar />}
      <div className="flex bg-[#FAFAFA]">
        {!isOnAuthPage && isOnDashboardPage && <Sidebar />}
        <div className={cn("", !isOnAuthPage && isOnDashboardPage && "ml-5")}>
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
