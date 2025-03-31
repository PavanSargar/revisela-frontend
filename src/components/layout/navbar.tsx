import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import Logo from "@/assets/icons/revisela-logo.png";

type Props = {};

const RootNavbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between mx-[15px] sm:mx-[30px] mt-[22px] pb-[22px] overflow-hidden">
      <Image src={Logo} alt="Logo" />

      {/* Search bar */}
      <div className="relative max-w-[504px] w-full mx-4">
        <div className="flex items-center relative">
          <div className="absolute left-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for Quiz Sets, People, Subjects..."
            className="w-full py-2 px-10 border rounded-full bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-2">
        <Button className="h-10 rounded-full px-4 flex items-center gap-2 bg-purple-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Explore
        </Button>
        <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-500 text-white p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </Button>
        <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default RootNavbar;
