"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const { status, data } = useSession();

  console;

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className='w-full h-20 bg-white shadow-xl'>
      <div className='max-w-screen-xl h-full m-auto flex items-center justify-between  p-4'>
        <Link href='/'>
          <h1 className='text-2xl font-bold flex gap-1 hover:tracking-widest duration-200 cursor-pointer'>
            <span className='text-blue-600'>DEV</span>
            <span>CONTROLE</span>
          </h1>
        </Link>

        {status === "loading" && (
          <button className='animate-spin'>
            <FiLoader size={24} color='#475569' />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={24} color='#475569' />
          </button>
        )}

        {status === "authenticated" && (
          <nav className='flex gap-4'>
            <button>
              <Link href='/dashboard'>
                <FiUser
                  className='hover:scale-125 duration-200'
                  size={24}
                  color='#475569'
                />
              </Link>
            </button>
            <button onClick={handleLogout}>
              <FiLogOut
                className='hover:scale-125 duration-200'
                size={24}
                color='#ca2121'
              />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
