import './globals.css';
import NextAuthProvider from './context/SessionContext';
import Nav from '@/app/components/Nav';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/libs/authOptions';
import Hydrate from '@/app/components/Hydrate';
import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`mx-4 lg:mx-48 ${roboto.className}`}>
        <NextAuthProvider>
          <Hydrate>
            <Nav user={session?.user} expires={session?.expires as string} />
            {children}
          </Hydrate>
        </NextAuthProvider>
      </body>
    </html>
  );
}
