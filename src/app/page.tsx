import React from "react";
import Navbar from "./auth/components/navbar";

export default function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Home</h1>
        <p>this is home page</p>
      </div>
    </div>
  );
}
