'use client'
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";

// Updated path to our created assets
const LANDING_IMAGE = "/images/landing-image.png"; // You'll need to add a real image
const UNDERLINE_ICON = "/icons/underline-icon.svg";

const LandingPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {/* Hero section */}
      <div className="w-full px-4 py-10 md:px-[20%] lg:px-[20%]">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 lg:flex-row lg:gap-8">
          <div className="w-full md:w-1/2">
            <div className="relative mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-5 lg:text-[3rem]">
                A simple tool to help you revise 📖{" "}
              </h2>
              <div className="absolute w-full -bottom-8 -left-16 md:block hidden">
                <Image
                  src={UNDERLINE_ICON}
                  alt="underline"
                  width={300}
                  height={20}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Image placeholder until you add a real image */}
            <div className="bg-blue-100 h-[250px] w-[400px] rounded-lg flex items-center justify-center max-w-full md:max-h-[250px]">
              <p className="text-blue-500 text-center p-4">Landing Image Placeholder</p>
            </div>
            {/* Uncomment when you have a real image 
            <Image
              priority
              height={250}
              width={400}
              src={LANDING_IMAGE}
              alt="Landing illustration"
              className="object-contain max-h-[250px] w-auto"
            />
            */}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button 
            onClick={handleGetStarted}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Three Options Section */}
      <div className="text-center mt-12 px-3 py-14 md:py-[60px] bg-gradient-to-l from-[#0b2323] via-[#0b2323] to-[#2d8989] text-white">
        <h3 className="text-2xl md:text-4xl font-bold lg:text-[2.4rem]">Three Options, Countless Possibilities 🚀</h3>
        <p className="mt-2 text-lg md:text-3xl font-bold bg-gradient-to-r from-[#ce81da] via-[#ffce94] to-[#adf5c6] bg-clip-text text-transparent">
          Study Better, Learn Quicker, Get Higher Grades!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3 mt-6">
          <div className="bg-orange-200 p-3 text-black rounded-md">
            Flashcards
          </div>
          <div className="bg-green-200 p-3 text-black rounded-md">
            Multiple Choice Questions (MCQ)
          </div>
          <div className="bg-pink-200 p-3 text-black rounded-md">
            Fill-In
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 md:px-[1rem] lg:px-[2rem]">
        <h2 className="text-3xl font-bold text-center mb-10 lg:text-[3rem]">How to Use</h2>
        <div className="flex flex-col gap-8 md:gap-20 px-3">
          {/* Flashcards */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-8 bg-[#ce81da] rounded-[20px]">
            <div className="w-full md:w-1/2 max-w-md text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold">Flashcards</h3>
              <p>Create flashcards within minutes!</p>
              <p>Just add the text to be displayed on the front and back ✏️</p>
            </div>
            <div className="w-full md:w-1/2 max-w-[405px] shadow-[0px_1.5px_3px_3px_rgba(0,0,0,0.25)_inset] rounded-2xl aspect-[405/270]">
              {/* Video placeholder until you add real videos */}
              <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center shadow-md">
                <p className="text-gray-600 text-center p-4">Flashcard Demo Video</p>
              </div>
              {/* Uncomment when you have the videos
              <video autoPlay loop muted playsInline className="w-full h-full rounded-lg object-cover border border-black/10 shadow-[0px_1.5px_3px_3px_rgba(0,0,0,0.1)_inset,0px_2px_8px_rgba(0,0,0,0.05)]">
                <source src="/videos/flash-card.mp4" type="video/mp4" />
              </video>
              */}
            </div>
          </div>

          {/* MCQ */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 p-4 md:p-8 bg-[#ffce94] rounded-[20px]">
            <div className="w-full md:w-1/2 max-w-md text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold">Multiple Choice Questions (MCQ)</h3>
              <p>Create MCQs seamlessly!</p>
              <p>
                Add your question, options, choose the correct option and done
                ✅
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-[405px] shadow-[0px_1.5px_3px_3px_rgba(0,0,0,0.25)_inset] rounded-2xl aspect-[405/270]">
              {/* Video placeholder until you add real videos */}
              <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center shadow-md">
                <p className="text-gray-600 text-center p-4">MCQ Demo Video</p>
              </div>
              {/* Uncomment when you have the videos
              <video autoPlay loop muted playsInline className="w-full h-full rounded-lg object-cover border border-black/10 shadow-[0px_1.5px_3px_3px_rgba(0,0,0,0.1)_inset,0px_2px_8px_rgba(0,0,0,0.05)]">
                <source src="/videos/mcq.mp4" type="video/mp4" />
              </video>
              */}
            </div>
          </div>

          {/* Fill-In */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-8 bg-[#adf5c6] rounded-[20px]">
            <div className="w-full md:w-1/2 max-w-md text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold">Fill-In</h3>
              <p>
                Create fill-in the blanks without breaking a sweat 😅
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-[405px] shadow-[0px_1.5px_3px_3px_rgba(0,0,0,0.25)_inset] rounded-2xl aspect-[405/270]">
              {/* Video placeholder until you add real videos */}
              <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center shadow-md">
                <p className="text-gray-600 text-center p-4">Fill-In Demo Video</p>
              </div>
              {/* Uncomment when you have the videos
              <video autoPlay loop muted playsInline className="w-full h-full rounded-lg object-cover border border-black/10 shadow-[0px_1.5px_3px_3px_rgba(0,0,0,0.1)_inset,0px_2px_8px_rgba(0,0,0,0.05)]">
                <source src="/videos/fill-in.mp4" type="video/mp4" />
              </video>
              */}
            </div>
          </div>

          {/* Create Test Check Repeat */}
          <div className="text-center mt-16">
            <h2 className="text-2xl md:text-4xl font-light">
              Create 📝 → Test 👍 → Check 📖 → Repeat 🔄
            </h2>
          </div>
        </div>
      </div>

      {/* Why Revisela Section */}
      <div className="bg-gray-100 text-center mt-16 px-3 py-12">
        <h3 className="text-2xl md:text-4xl font-bold lg:text-[2.4rem]">Why Revisela?</h3>
        <div className="flex flex-col items-start gap-2 mt-6 mx-auto text-start max-w-md text-lg md:text-xl lg:text-[1.5rem]">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-2xl">✅</span> 
            <span>It's free!</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-2xl">✅</span> 
            <span>Easy to use</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-2xl">✅</span> 
            <span>No account required</span>
          </div>
        </div>
        <div className="mt-6">
          <button 
            onClick={handleGetStarted}
            className="px-6 py-3 bg-[#5cd6c9] text-black font-medium rounded-full hover:bg-[#4bc1b5] transition-all hover:scale-105"
          >
            Try It Out
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage; 