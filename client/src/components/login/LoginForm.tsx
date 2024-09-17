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
        className="flex flex-col gap-10 px-5 py-10 w-full min-w-[20rem] sm:py-5 justify-center sm:h-[40vh] min-h-fit rounded-m"
      >
        <input type="hidden" name="doctorSlug" value={params.name} />

        <p>
          <Input
            className="border-inputB focus-visible:ring-inputB text-center placeholder:text-muted-foreground/50"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            title="Name"
          />
          {data?.error && <p className="error-msg">{data.error.phone}</p>}
        </p>
        <p>
          <Input
            className="border-inputB focus-visible:ring-inputB text-center placeholder:text-muted-foreground/50"
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone Number"
          />
          {data?.error && <p className="error-msg">{data.error.phone}</p>}
        </p>
        <p>
          <Input
            className="border-inputB focus-visible:ring-inputB text-center placeholder:text-muted-foreground/50"
            type="email"
            id="email"
            name="email"
            placeholder="Email Address (optional)"
          />
          {data?.error && <p className="error-msg">{data.error.phone}</p>}
        </p>

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-p1 font-cr text-lg hover:bg-p1/75">
      {pending ? `Login...` : `Login`}
    </Button>
  );
};
