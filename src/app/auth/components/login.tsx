"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import GoogleIcon from "@/assets/icons/google.svg";
import MicrosoftIcon from "@/assets/icons/microsoft.svg";
import { useLogin } from "@/services/features/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const { mutate: login, isPending, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <Button
          type="button"
          variant="outline"
          className="text-[16px] flex items-center text-nowrap gap-2 w-full h-[3.0625rem] border-[#E5E5E5] mb-2 sm:mb-0"
        >
          <Image src={GoogleIcon} alt="Google" />
          Continue with Google
        </Button>
        <Button
          type="button"
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

      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {apiError instanceof Error ? apiError.message : "Login failed"}
        </div>
      )}

      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" {...register("rememberMe")} />
        <a href="?forget-password=true" className="text-[18px] text-[#0890A8]">
          Forgot Password?
        </a>
      </div>
      <Button
        type="submit"
        className="bg-[#0890A8] text-white block w-full h-[3.0625rem]"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};

export default Login;
