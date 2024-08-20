'use client';

import { addFolder, updateFolder } from '@/app/actions/folder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Folder } from '@prisma/client';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

type FolderFormProps = {
  folder?: Folder;
  onClick: () => void;
};

export default function FolderForm({ folder, onClick }: FolderFormProps) {
  const [data, action] = useFormState(folder == null ? addFolder : updateFolder.bind(null, folder.id), null);

  const params = useParams();

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClick();
    }
  }, [data]);

  return (
    <>
      <form action={action} className="flex flex-col gap-8">
        <p>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" className="mt-2" defaultValue={folder?.name || ''} />

          {data?.error && <p className="error-msg">{data.error.name}</p>}
        </p>

        <p className="hidden">
          <Input name="doctorSlug" type="hidden" value={params.slug} />
        </p>

        <SubmitButton />
      </form>
    </>
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
