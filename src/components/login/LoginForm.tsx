'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';

function LoginForm() {
  const params = useParams();

  return (
    <>
      <form className="flex flex-col gap-10 px-5 py-10 w-full min-w-[20rem] sm:py-5 justify-center sm:h-[40vh] min-h-fit font-light border-2 rounded-md border-pink-100 bg-pink-300/40">
        <p>
          <label htmlFor="phone">Phone Number</label>
          <Input className="border-pink-300 focus-visible:ring-pink-400" type="text" id="phone" name="phone" />
        </p>

        <Button className="bg-p1 hover:bg-p1/75" asChild>
          <Link href={`/doctor/${params.name}/home`}>
            <span>Login</span>
            <ChevronRight className="size-4 ml-4" />
          </Link>
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
