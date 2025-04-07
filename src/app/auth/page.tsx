"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Login from "./components/login";
import SignUp from "./components/signup";
import ForgotPassword from "./components/forgot-password";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const signup = searchParams.get("signup") === "true";
  const forgetPassword = searchParams.get("forget-password") === "true";

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6">
      {!signup && !forgetPassword && <Login />}
      {signup && <SignUp />}
      {forgetPassword && (
        <div className="mt-[-5rem]">
          <ForgotPassword />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
