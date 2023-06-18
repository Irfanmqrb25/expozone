"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineCamera } from "react-icons/ai";

declare global {
  var cloudinary: any;
}

interface AvatarUploadProps {
  onChange: (value: any) => void;
  value: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="wj96fzec"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="relative w-[150px] h-[150px] flex flex-col items-center justify-center gap-2 p-5 transition border-2 border-dashed rounded-[50%] cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600"
            >
              <AiOutlineCamera size={30} />
              {value && (
                <div className="absolute inset-0">
                  <Image
                    alt="upload"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-[50%]"
                    src={value}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default AvatarUpload;
