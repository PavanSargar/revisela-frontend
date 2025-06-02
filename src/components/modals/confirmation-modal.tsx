import React from 'react';

import { Button, Modal } from '@/components/ui';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  loadingText?: string;
  loadingAnimation?: 'spin' | 'pulse' | 'dots' | 'bars' | 'ripple';
  children?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-[#0890A8] hover:bg-[#0890A8]/80 text-white',
  onConfirm,
  isLoading = false,
  loadingText = 'Processing...',
  loadingAnimation = 'spin',
  children,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant="solid"
            className={confirmButtonClass}
            onClick={handleConfirm}
            loading={isLoading}
            loadingText={loadingText}
            loadingAnimation={loadingAnimation}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

export default ConfirmationModal;
