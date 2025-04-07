"use client";

import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  label?: string;
  helperText?: string;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete,
  label,
  helperText = "Input the six digit code that has been sent to your email",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length > 1) {
      // Handle paste or multiple character input
      const chars = value.split("").slice(0, length);
      const newOtp = [...otp];

      chars.forEach((char, idx) => {
        if (index + idx < length) {
          newOtp[index + idx] = char;
        }
      });

      setOtp(newOtp);

      // Focus on the next empty input or the last input
      const nextIndex = Math.min(index + chars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      if (newOtp.every((val) => val !== "")) {
        onComplete?.(newOtp.join(""));
      }
    } else {
      // Handle single character input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input if available
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newOtp.every((val) => val !== "")) {
        onComplete?.(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (pastedData) {
      const chars = pastedData.split("").slice(0, length - index);
      const newOtp = [...otp];

      chars.forEach((char, idx) => {
        if (index + idx < length) {
          newOtp[index + idx] = char;
        }
      });

      setOtp(newOtp);

      // Focus on the next empty input or the last input
      const nextIndex = Math.min(index + chars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      if (newOtp.every((val) => val !== "")) {
        onComplete?.(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="block text-[18px] text-[#444444]">{label}</label>
      )}

      {helperText && (
        <p className="text-[14px] text-[#444444] mb-2">{helperText}</p>
      )}

      <div className="flex gap-2 justify-between">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            className={cn(
              "w-12 h-12 text-center text-xl font-semibold border border-[#ACACAC] rounded-md focus:outline-none focus:ring focus:border-[#0890A8]",
              otp[index] ? "text-black" : "text-[#ACACAC]"
            )}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>
    </div>
  );
};
