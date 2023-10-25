'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store';
import Cart from '@/components/Cart';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from 'next-auth';

const Nav = ({ user }: Session) => {
  const cartStore = useCartStore();

  return (
    <nav className="flex items-center justify-between py-12">
      <Link href="/">
        <h1>Shop</h1>
      </Link>
      <ul className="flex items-center gap-12">
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
                className="absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white"
              >
                {cartStore.cartQuantity}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {!user && (
          <li className="rounded-md bg-teal-600 p-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <Link href="/dashboard">
              <Image
                src={user.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default Nav;
