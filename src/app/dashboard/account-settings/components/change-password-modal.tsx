'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

import { apiRequest } from '@/services/api-client';
import { AUTH_ENDPOINTS } from '@/services/endpoints';

import { Button, Input, Modal } from '@/components/ui';
import { useToast } from '@/components/ui/toast';

// Password schema with validation rules
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

interface ChangePasswordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onOpenChange,
  userId,
}) => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleChangePassword = async (data: PasswordFormData) => {
    if (!isDirty || !isValid) return;

    try {
      setIsPending(true);
      // This endpoint might need to be adjusted based on your API
      const response = await apiRequest(AUTH_ENDPOINTS.RESET_PASSWORD, {
        body: {
          userId,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: 'Password Updated',
        description: 'Your password has been changed successfully.',
        type: 'success',
      });

      handleClose();
    } catch (error: any) {
      toast({
        title: 'Password Update Failed',
        description:
          error.message || 'Failed to update password. Please try again.',
        type: 'error',
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Modal
      title="Change Password"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      description="Update your account password"
    >
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="space-y-4 mt-4"
      >
        <Input
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          placeholder="Enter your current password"
          {...register('currentPassword')}
          error={errors.currentPassword?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="text-[#ACACAC] hover:text-[#444444]"
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <Input
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          {...register('newPassword')}
          error={errors.newPassword?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="text-[#ACACAC] hover:text-[#444444]"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <Input
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-[#ACACAC] hover:text-[#444444]"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#0890A8] text-white"
            disabled={!isDirty || !isValid || isPending}
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
