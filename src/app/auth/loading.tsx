import React from "react";
import { Loader } from "@/components/ui";

export default function AuthLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center gap-4">
        <Loader size="large" />
        <p className="text-lg text-[#444444]">Loading authentication...</p>
      </div>
    </div>
  );
}
