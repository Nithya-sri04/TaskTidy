"use client";
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

function Header({ onServicesClick }) {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='p-5 shadow-sm flex justify-between items-center'> {/* Added items-center */}
      <div className='flex items-center gap-8'>
        <Image src='/logo.svg' alt='logo' width={80} height={80} />
        <div className='md:flex items-center gap-6 hidden'>
          <Link href={'/'} className='font-bold text-lg hover:scale-105 hover:text-primary cursor-pointer'>
            Home
          </Link>
          <h2
            className='font-bold text-lg hover:scale-105 hover:text-primary cursor-pointer'
            onClick={onServicesClick}
          >
            Services
          </h2>
          <h2 className='font-bold text-lg hover:scale-105 hover:text-primary cursor-pointer'>
            About Us
          </h2>
        </div>
      </div>
      <div className='flex items-center'> {/* Added flex and items-center */}
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.user?.image}
                alt='user'
                width={40}
                height={40}
                className='rounded-full'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/myBooking'}>My Booking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn('descope')}>Login / Sign Up</Button>
        )}
      </div>
    </div>
  );
}

export default Header;


