import React from 'react';

const ProductSkeleton = () => {
  return (
    <div>
      <div className="h-96 w-full animate-pulse rounded-lg bg-slate-200" />
      <div className="flex flex-col gap-2 py-2">
        <div className="h-5 w-3/5 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-4 w-1/5 animate-pulse rounded-lg bg-slate-100" />
      </div>
    </div>
  );
};

const Loading = () => {
  const arr = Array.from({ length: 8 }, () => crypto.randomUUID());

  return (
    <div className="grid grid-cols-fluid gap-12">
      {arr.map((i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default Loading;
