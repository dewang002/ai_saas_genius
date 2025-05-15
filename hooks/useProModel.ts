import { create } from "zustand";

interface useProModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModel = create<useProModelStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))