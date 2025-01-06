'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';

type BackButtonProps = {
  title: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({
  title,
  variant,
  className,
  ...props
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
    >
      {title}
    </Button>
  );
}
