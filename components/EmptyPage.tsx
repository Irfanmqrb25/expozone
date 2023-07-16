"use client";

import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import { Button } from "./ui/button";
import { useCallback } from "react";

const EmptyStore = () => {
  const createStoreModal = useCreateStoreModal();

  const onCreateStoreModal = useCallback(() => {
    createStoreModal.onOpen();
  }, [createStoreModal]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-medium">You dont have a store yet</h1>
      <p className="text-neutral-500">Create a new store now!</p>
      <Button onClick={onCreateStoreModal}>Create Store</Button>
    </div>
  );
};

export default EmptyStore;
