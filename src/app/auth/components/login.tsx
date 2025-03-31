import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import GoogleIcon from "@/assets/icons/google.svg";
import MicrosoftIcon from "@/assets/icons/microsoft.svg";

const Login = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <Button
          variant="outline"
          className="text-[16px] flex items-center text-nowrap gap-2 w-full h-[3.0625rem] border-[#E5E5E5] mb-2 sm:mb-0"
        >
          <Image src={GoogleIcon} alt="Google" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="text-[16px] flex items-center text-nowrap gap-2 w-full h-[3.0625rem] border-[#E5E5E5]"
        >
          <Image src={MicrosoftIcon} alt="Microsoft" />
          Continue with Microsoft
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="w-[50%] h-[1px] bg-[#000]"></div>
        <p className="text-[18px] text-[#444444]">Or</p>
        <div className="w-[50%] h-[1px] bg-[#000]"></div>
      </div>

      <Input label="Email" placeholder="Enter your email" type="email" />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" />
        <a href="#" className="text-[18px] text-[#0890A8]">
          Forgot Password?
        </a>
      </div>
      <Button className="bg-[#0890A8] text-white block w-full h-[3.0625rem]">
        Log In
      </Button>
    </div>
  );
};

export default Login;
