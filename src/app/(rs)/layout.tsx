import { ReactNode } from 'react';
import { Header } from '@/components/Header';

export default async function RSLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Header />
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}
