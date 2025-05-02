import React from 'react';


import Navbar from './auth/components/navbar';
import LandingPage from '@/components/LandingPage';

export default function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      <LandingPage />
    </div>
  );
}
