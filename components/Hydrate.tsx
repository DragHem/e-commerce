'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useThemeStore } from '@/store';

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const themeStore = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body className="px-4 lg:px-48" data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body data-theme={themeStore.mode}></body>
      )}
    </>
  );
};

export default Hydrate;
