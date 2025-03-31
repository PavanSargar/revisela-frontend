import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Logo from "@/assets/icons/revisela-logo.png";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between mx-[15px] sm:mx-[30px] mt-[22px] overflow-hidden">
      <Image src={Logo} alt="Logo" />
      <div className="flex items-center gap-2">
        <Button className="h-[2.5rem] sm:h-[3.0625rem] w-fit text-[18px] sm:text-[24px] bg-[#0890A8] text-white">
          Login
        </Button>
        <Button
          className="h-[2.5rem] sm:h-[3.0625rem] w-fit text-[18px] sm:text-[24px] bg-[#F7F7F7] text-[#444]"
          variant="outline"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
