'use client';

import { logout } from '@/app/actions/auth';
import Nav, { NavLink } from '@/components/ui/Nav';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

function Header() {
  const router = useRouter();

  return (
    <header>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink
          href=""
          onClick={async () => {
            await logout();
            toast.success('You are logged out');
            router.refresh();
          }}
        >
          Logout
        </NavLink>
      </Nav>
    </header>
  );
}

export default Header;
