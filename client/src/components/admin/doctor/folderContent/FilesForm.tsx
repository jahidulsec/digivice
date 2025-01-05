'use client';

import { addFiles } from '@/app/actions/files';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';

type FilesFormProps = {
  onClick: () => void;
};

export default function FilesForm({ onClick }: FilesFormProps) {
  const params = useParams();
  const [fileType, setFileType] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const router = useRouter();

  // const [data, action] = useFormState(addFiles, null);

  const validFileType = ['video/mp4', 'application/pdf'];

  // useEffect(() => {
  //   if (data?.toast) {
  //     toast.error(data.toast);
  //   } else if (data?.success) {
  //     toast.success(data.success);
  //     onClick();
  //   }
  // }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file as File);
    formData.append('thumbnail', thumbnail as File);
    formData.append('folderId', params.id as string);
    formData.append('doctorSlug', params.slug as string);

    try {
      const res = await axios.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadProgress(progress);
        },
      });

      toast.success(res.data.message);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-5"
      // action={action}
      onSubmit={handleSubmit}
    >
      <p>
        <Label htmlFor="name">File Name</Label>
        <Input
          className="mt-2"
          name="name"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </p>

      <p>
        <Label htmlFor="file">Select File</Label>
        <Input
          id="file"
          name="file"
          className="mt-2"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFileType(e.target.files[0].type as string);
              setFile(e.target.files[0]);
            }
          }}
          accept="image/*, video/*, application/pdf"
        />
        {/* {data?.error && <p className="error-msg">{data.error}</p>} */}

        {/* <input type="hidden" name="folderId" value={params.id} />
        <input type="hidden" name="doctorSlug" value={params.slug} /> */}
      </p>
      {validFileType.includes(fileType) && (
        <p>
          <Label htmlFor="thumbnail">Select Thumbnail</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            className="mt-2"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setThumbnail(e.target.files[0]);
              }
            }}
          />
        </p>
      )}

      {/* <SubmitButton /> */}
      <Button disabled={loading}>{uploadProgress > 0 && uploadProgress < 100 ? `Uploading ${uploadProgress} %` : 'Submit'}</Button>
    </form>
  );
}

// const SubmitButton = () => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending}>
//       {pending ? `Saving...` : `Save`}
//     </Button>
//   );
// };
