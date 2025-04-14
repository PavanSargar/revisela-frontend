"use client";

import React, { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  footer,
  contentClassName,
  showCloseButton = true,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-overlay-gray backdrop-blur-sm animate-fadeIn" />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 focus:outline-none z-[101] w-[90%] max-w-md animate-scaleIn",
            contentClassName
          )}
        >
          {showCloseButton && (
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          )}

          {title && (
            <Dialog.Title className="text-lg font-semibold text-secondary-black mb-2">
              {title}
            </Dialog.Title>
          )}

          {description && (
            <Dialog.Description className="text-neutral-gray mb-4">
              {description}
            </Dialog.Description>
          )}

          <div className="mb-4">{children}</div>

          {footer && <div className="mt-4">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
