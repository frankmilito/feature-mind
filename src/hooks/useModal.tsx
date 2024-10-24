import { useCallback, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return { isModalOpen, openModal, closeModal };
};
