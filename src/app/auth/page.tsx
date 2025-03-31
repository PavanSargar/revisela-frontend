"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Login from "./components/login";
import SignUp from "./components/signup";
import ForgotPassword from "./components/forgot-password";

const AuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthWrapper />
    </Suspense>
  );
};

export default AuthPage;

const AuthWrapper = () => {
  const searchParams = useSearchParams();
  const signup = Boolean(searchParams.get("signup") === "true");
  const forgetPassword = Boolean(
    searchParams.get("forget-password") === "true"
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6">
        {!signup && !forgetPassword && <Login />}
        {signup && <SignUp />}
        {forgetPassword && (
          <div className="mt-[-5rem]">
            <ForgotPassword />
          </div>
        )}
      </div>
    </Suspense>
  );
};
