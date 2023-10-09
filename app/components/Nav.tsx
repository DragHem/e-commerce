'use client';

import React from 'react';
import type { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const Nav = ({ user }: Session) => {
  return (
    <nav className="flex items-center justify-between py-8">
      <h1>Nav</h1>
      <ul className="flex items-center gap-12">
        {!user && (
          <li className="rounded-md bg-teal-600 p-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={48}
              height={48}
              className="rounded-full"
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
