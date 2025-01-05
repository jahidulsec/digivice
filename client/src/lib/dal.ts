import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { redirect } from 'next/navigation';
import db from '../../db/db';
import { cache } from 'react';

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.admin.findUnique({
      where: { id: `${session.userId }`},
      // Explicitly return the columns you need rather than the whole user object
      select: {
        username: true,
        name: true,
        id: true,
      },
    });

    const user = data;

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    console.log(error);
    return null;
  }
};
