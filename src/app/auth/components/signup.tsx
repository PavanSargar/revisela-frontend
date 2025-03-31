import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DateInput } from "@/components/ui/DateInput";
import GoogleIcon from "@/assets/icons/google.svg";
import MicrosoftIcon from "@/assets/icons/microsoft.svg";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-4 my-[3.75rem]">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <Button
          variant="outline"
          className="text-[16px] flex items-center text-nowrap gap-2 w-full h-[3.0625rem] border-[#E5E5E5] mb-2 sm:mb-0"
        >
          <Image src={GoogleIcon} alt="Google" />
          Sign up with Google
        </Button>
        <Button
          variant="outline"
          className="text-[16px] flex items-center text-nowrap gap-2 w-full h-[3.0625rem] border-[#E5E5E5]"
        >
          <Image src={MicrosoftIcon} alt="Microsoft" />
          Sign up with Microsoft
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="w-[50%] h-[1px] bg-[#000]"></div>
        <p className="text-[18px] text-[#444444]">Or</p>
        <div className="w-[50%] h-[1px] bg-[#000]"></div>
      </div>

      <Input label="Full Name" placeholder="Enter your full name" type="text" />
      <Input label="Username" placeholder="Enter your username" type="text" />
      <DateInput label="Birthday" />
      <Input label="Email" placeholder="Enter your email" type="email" />
      <Input label="Password" placeholder="Create a password" type="password" />

      <div className="flex items-center">
        <Checkbox label="I agree to the Terms of Service and Privacy Policy" />
      </div>

      <Button className="bg-[#0890A8] text-white block w-full h-[3.0625rem]">
        Sign Up
      </Button>

      <p className="text-center text-[14px] text-[#444444]">
        Already have an account?{" "}
        <a href="?signup=false" className="text-[#0890A8]">
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
