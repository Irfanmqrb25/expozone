import { create } from "zustand";

interface CreateStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateStoreModal = create<CreateStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateStoreModal;
