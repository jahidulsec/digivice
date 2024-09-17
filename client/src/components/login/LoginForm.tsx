'use client';

import React, { useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { addViewer } from '@/app/actions/viewer';

export default function LoginForm() {
  const params = useParams();

  const [data, action] = useFormState(addViewer, null);

  const router = useRouter();

  useEffect(() => {
    if (data?.success) {
      router.push(`/doctor/${params.name}/home`);
    }
  }, [data]);

  return (
    <>
      <form
        action={action}
        className="flex flex-col gap-10 px-5 py-10 w-full min-w-[20rem] sm:py-5 justify-center sm:h-[40vh] min-h-fit font-light border-2 rounded-md border-pink-100 bg-pink-300/40"
      >
        <p>
          <label htmlFor="phone">Phone Number</label>
          <Input className="border-pink-300 focus-visible:ring-pink-400" type="text" id="phone" name="phone" />
          {data?.error && <p className="error-msg">{data.error.phone}</p>}

          <input type="hidden" name="doctorSlug" value={params.name} />
        </p>

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-p1 hover:bg-p1/75">
      {pending ? `Login...` : `Login`}
    </Button>
  );
};
