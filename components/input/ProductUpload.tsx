"use client";
import Image from "next/image";
import { useCallback } from "react";

import { AiOutlineCamera } from "react-icons/ai";
import { CldUploadWidget } from "next-cloudinary";

interface ProductUploadProps {
  onChange: (value: any) => void;
  value: string;
}
const ProductUpload: React.FC<ProductUploadProps> = ({ onChange, value }) => {
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
        uploadPreset="h3t4mv1o"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="relative flex flex-col items-center justify-center h-[200px] gap-2 p-5 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600"
            >
              <AiOutlineCamera size={30} />
              {value && (
                <div className="absolute inset-0">
                  <Image
                    alt="upload"
                    fill
                    style={{ objectFit: "cover" }}
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

export default ProductUpload;
