'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/Button';

import Logo from '@/assets/icons/revisela-logo.png';

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const isOnAuthPage = pathname.includes('/auth');
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between px-[15px] mt-[22px] overflow-hidden">
      <Image src={Logo} alt="Logo" />
      {!isOnAuthPage && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/auth')}
            className="h-[2.5rem] sm:h-[3.0625rem] w-fit text-[18px] sm:text-[24px] bg-[#0890A8] text-white"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push('/auth?signup=true')}
            className="h-[2.5rem] sm:h-[3.0625rem] w-fit text-[18px] sm:text-[24px] bg-[#F7F7F7] text-[#444]"
            variant="outline"
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
