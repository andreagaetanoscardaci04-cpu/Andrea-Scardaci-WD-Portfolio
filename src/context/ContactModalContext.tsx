import React, { createContext, useContext, useState, useCallback } from 'react';

interface ContactModalContextValue {
  isOpen: boolean;
  source: string;
  openModal: (source?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined);

export const ContactModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('');

  const openModal = useCallback((src: string = 'sito') => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ isOpen, source, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error('useContactModal must be used within a ContactModalProvider');
  return ctx;
};
