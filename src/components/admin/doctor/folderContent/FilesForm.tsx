'use client';

import { addFiles } from '@/app/actions/files';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

type FilesFormProps = {
  onClick: () => void;
};

export default function FilesForm({ onClick }: FilesFormProps) {
  const params = useParams();

  const [data, action] = useFormState(addFiles, null);

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClick();
    }
  }, [data]);

  return (
    <form className="flex flex-col gap-8" action={action}>
      <p>
        <Label htmlFor="name">Select Files</Label>
        <Input
          id="name"
          name="file"
          className="mt-2"
          type="file"
          multiple
          accept="image/jpeg, image/jpg, image/png, video/mp4"
        />
        {data?.error && <p className="error-msg">{data.error}</p>}

        <input type="hidden" name="folderId" value={params.id} />
        <input type="hidden" name="doctorSlug" value={params.slug} />
      </p>

      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};
