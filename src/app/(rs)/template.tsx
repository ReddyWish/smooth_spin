import { ReactNode } from 'react';

export default async function Template({ children }: { children: ReactNode }) {
  return <div className="animate-appear">{children}</div>;
}
