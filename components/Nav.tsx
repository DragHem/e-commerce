'use client';

import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store';
import Cart from '@/components/Cart';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from 'next-auth';
import DarkModeSwitch from '@/components/DarkModeSwith';

const Nav = ({ user }: Session) => {
  const cartStore = useCartStore();

  return (
    <nav className="flex items-center justify-between py-12">
      <Link href="/">
        <h1 className="font-lobster text-2xl">Shopster</h1>
      </Link>
      <ul className="flex items-center gap-8">
        <li
          className="relative flex cursor-pointer items-center text-3xl"
          onClick={() => cartStore.toggleCart()}
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cartQuantity > 0 && (
              <motion.span
                animate={{
                  scale: 1,
                }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full text-sm font-bold text-white"
              >
                {cartStore.cartQuantity}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        <DarkModeSwitch />
        {!user && (
          <li className="bg-primary rounded-md px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box w-72 space-y-4 p-4 shadow"
              >
                <Link
                  className="hover:bg-base-300 rounded-md p-4"
                  href={'/dashboard'}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  className="hover:bg-base-300 rounded-md p-4"
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default Nav;
