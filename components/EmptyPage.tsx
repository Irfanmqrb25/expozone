"use client";

import useCreateStoreModal from "@/hooks/useCreateStoreModal";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { Card } from "./ui/card";

const EmptyStore = () => {
  const createStoreModal = useCreateStoreModal();

  const onCreateStoreModal = useCallback(() => {
    createStoreModal.onOpen();
  }, [createStoreModal]);

  return (
    <Card className="border-2 border-black p-7 md:w-fit">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">You dont have a store yet</h1>
        <p className="text-neutral-500">Create a new store now!</p>
        <Button size="sm" className="mx-auto ml-0" onClick={onCreateStoreModal}>
          Create Store
        </Button>
      </div>
    </Card>
  );
};

export default EmptyStore;
