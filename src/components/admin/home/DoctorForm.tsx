'use client';

import { addDoctor, deleteSocialMediaLink, updateDoctor } from '@/app/actions/doctor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prisma } from '@prisma/client';
import { Label } from '@radix-ui/react-label';
import { Dice1, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface DoctorFromProps {
  doctor?: Prisma.DoctorGetPayload<{ include: { SocialMediaLinks: true } }>;
  onClose: () => void;
}

export default function DoctorForm({ onClose, doctor }: DoctorFromProps) {
  const [data, action] = useFormState(doctor == null ? addDoctor : updateDoctor.bind(null, doctor.id), null);

  const [socialMediaLinks, setSocialMediaLinks] = useState<any[]>(
    doctor?.SocialMediaLinks ? doctor.SocialMediaLinks : []
  );

  useEffect(() => {
    if (data?.toast != null) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClose();
    }
  }, [data]);

  useEffect(() => {
    console.log(socialMediaLinks);
  }, [socialMediaLinks]);

  return (
    <>
      <form action={action} className="grid grid-cols-2 gap-5 mt-5 px-1">
        <p className="flex flex-col gap-2">
          <Label htmlFor="childId">ID</Label>
          <Input type="number" id="childId" name="childId" defaultValue={doctor != null ? doctor.childId : ''} />
          {data?.error != null && data?.error.childId && <p className="error-msg">{data.error.childId}</p>}
        </p>
        <p className="flex flex-col gap-2 col-span-2">
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
        <p className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="mobile">Mobile No.</Label>
          <Input id="mobile" name="mobile" defaultValue={doctor != null ? (doctor.mobile?.slice(3) as string) : ''} />
          {data?.error != null && data?.error.mobile && <p className="error-msg">{data.error.mobile}</p>}
        </p>

        {/* add social link button */}
        <Button
          type="button"
          variant={'outline'}
          className="border-dashed border-primary"
          onClick={() => {
            setSocialMediaLinks(() => {
              return [...socialMediaLinks, { url: '' }];
            });
          }}
        >
          <Plus className="size-4 mr-2" />
          <span>Social Media Links</span>
        </Button>

        {/* social media link fields */}
        <div className="social col-span-2 flex flex-col gap-3">
          {socialMediaLinks &&
            socialMediaLinks.map((_, index) => (
              <div className="grid grid-cols-[0.97fr_2rem] gap-3 items-end" key={index}>
                {/* <p>
                  <Label>Site Name</Label>
                  <Input
                    className="mt-2"
                    value={socialMediaLinks[index].siteName}
                    onChange={(e) => {
                      setSocialMediaLinks((prev: any[]) => {
                        prev[index].siteName = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                </p> */}
                <p>
                  <Label>Url</Label>
                  <Input
                    className="mt-2"
                    value={socialMediaLinks[index].url}
                    onChange={(e) => {
                      setSocialMediaLinks((prev: any[]) => {
                        prev[index].url = e.target.value;
                        return [...prev];
                      });
                    }}
                  />
                </p>
                <Button
                  type="button"
                  variant={'outline'}
                  size={'icon'}
                  onClick={async () => {
                    setSocialMediaLinks(() => {
                      return socialMediaLinks.filter((_, idx) => {
                        return idx !== index;
                      });
                    });
                    if (socialMediaLinks[index].id) {
                      await deleteSocialMediaLink(socialMediaLinks[index].id);
                    }
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          <input type="hidden" name="socialLinks" value={JSON.stringify(socialMediaLinks)} />
        </div>
        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="col-span-2" type="submit" disabled={pending}>
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};
