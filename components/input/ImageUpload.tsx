"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        </div>
      ) : null}
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="h3t4mv1o"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              {value ? "Change image" : `Upload image (max 1)`}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
