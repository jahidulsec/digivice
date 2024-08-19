'use client';

import { addDoctor, updateDoctor } from '@/app/actions/doctor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Doctor } from '@prisma/client';
import { Label } from '@radix-ui/react-label';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface DoctorFromProps {
  doctor?: Doctor;
  onClose: () => void;
}

export default function DoctorForm({ onClose, doctor }: DoctorFromProps) {
  const [data, action] = useFormState(doctor == null ? addDoctor : updateDoctor.bind(null, doctor.id), null);

  useEffect(() => {
    if (data?.toast != null) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClose();
    }
  }, [data]);

  return (
    <>
      <form action={action} className="grid grid-cols-1 gap-5">
        <p className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" defaultValue={doctor != null ? doctor.fullName : ''} />
          {data?.error != null && data?.error.fullName && <p className="error-msg">{data.error.fullName}</p>}
        </p>
        <p className="flex flex-col gap-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            name="designation"
            defaultValue={doctor != null ? (doctor.designation as string) : ''}
          />
          {data?.error != null && data?.error.designation && <p className="error-msg">{data.error.designation}</p>}
        </p>
        <p className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" defaultValue={doctor != null ? (doctor.email as string) : ''} />
          {data?.error != null && data?.error.email && <p className="error-msg">{data.error.email}</p>}
        </p>
        <SubmitButton />
      </form>
    </>
  );
}

type FormFieldProps = {
  title: string;
  id: string;
  error: {
    email?: string[] | undefined;
    fullName?: string[] | undefined;
    designation?: string[] | undefined;
  };
  type?: string;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};
