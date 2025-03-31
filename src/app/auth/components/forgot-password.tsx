import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/ui/OtpInput";

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendEmail = () => {
    // Here you would add your API call to send the verification code
    console.log("Sending code to:", email);
    setStep("otp");
  };

  const handleVerifyOtp = (code: string) => {
    // Here you would verify the OTP with your API
    setOtp(code);
    if (code.length === 6) {
      // Automatically move to reset step when OTP is complete
      setStep("reset");
    }
  };

  const handleResetPassword = () => {
    // Here you would submit the new password to your API
    console.log("Resetting password with OTP:", otp);
    // Redirect to login page or show success message
  };

  return (
    <div className="flex flex-col gap-6  max-w-md mx-auto">
      <h2 className="text-2xl font-medium text-center text-[#444444] mb-4">
        Forgot password
      </h2>

      {step === "email" && (
        <Input
          className="w-[20rem]"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rightElement={
            <Button
              onClick={handleSendEmail}
              className="bg-[#0890A8] text-white px-3 py-1 text-sm rounded-md"
            >
              Send
            </Button>
          }
        />
      )}

      {step === "otp" && (
        <OtpInput
          length={6}
          onComplete={handleVerifyOtp}
          helperText="Input the six digit code that has been sent to your email"
        />
      )}

      {step === "reset" && (
        <>
          <Input
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#ACACAC] hover:text-[#444444]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#ACACAC] hover:text-[#444444]"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <Button
            onClick={handleResetPassword}
            className="bg-[#0890A8] text-white block w-full h-[3.0625rem] mt-4"
          >
            Update Password
          </Button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
