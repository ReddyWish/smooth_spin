import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type NavButtonProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const NavButton = ({ icon: Icon, label, href }: NavButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      title={label}
      aria-label={label}
      asChild
      className="rounded-full"
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
};
