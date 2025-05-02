import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { useCreateClass } from '@/services/features/classes';

import { Button, Input, Modal, OtpInput, TabSwitch } from '@/components/ui';
import { useToast } from '@/components/ui/toast';

const createClassSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  schoolName: z.string().min(1, 'School/University/Group name is required'),
});

type CreateClassFormData = z.infer<typeof createClassSchema>;

interface ClassModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'create' | 'join';
  onSuccess?: () => void;
}

export const ClassModal: React.FC<ClassModalProps> = ({
  isOpen,
  onOpenChange,
  type = 'create',
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'join'>(type);
  const [classCode, setClassCode] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createClass, isPending: isCreating } = useCreateClass();

  // Create class form setup
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreateForm,
    formState: { errors: createErrors, isValid: isCreateValid },
  } = useForm<CreateClassFormData>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: '',
      schoolName: '',
    },
    mode: 'onChange',
  });

  const onCreateClass = (data: CreateClassFormData) => {
    createClass(
      {
        name: data.name,
        description: `Class for ${data.schoolName}`,
        subject: data.schoolName,
        isPublic: false,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['classes'] });
          queryClient.invalidateQueries({ queryKey: ['my-classes'] });

          toast({
            title: 'Success',
            description: 'Class created successfully',
            type: 'success',
          });
          handleClose();
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message || 'Failed to create class',
            type: 'error',
          });
        },
      }
    );
  };

  const handleJoinClass = () => {
    if (!classCode || classCode.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 6-digit class code',
        type: 'error',
      });
      return;
    }

    toast({
      title: 'Info',
      description: 'Join class functionality will be implemented soon',
      type: 'info',
    });
  };

  const handleClose = () => {
    resetCreateForm();
    setClassCode('');
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Class"
      contentClassName="max-w-md"
    >
      <TabSwitch
        options={[
          { value: 'create', label: 'Create A Class', color: '#0890A8' },
          { value: 'join', label: 'Join A Class', color: '#058F3A' },
        ]}
        value={activeTab}
        onChange={(value) => setActiveTab(value as 'create' | 'join')}
        className="mb-8"
      />

      {activeTab === 'create' ? (
        <form
          onSubmit={handleSubmitCreate(onCreateClass)}
          className="space-y-4"
        >
          <Input
            label="Class Name"
            placeholder="Enter class name"
            {...registerCreate('name')}
            error={createErrors.name?.message}
            required
          />

          <Input
            label="School/University/Group Name"
            placeholder="Enter school/university/group name"
            {...registerCreate('schoolName')}
            error={createErrors.schoolName?.message}
            required
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-[#ACACAC] text-secondary-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0890A8] text-white"
              disabled={isCreating || !isCreateValid}
            >
              {isCreating ? 'Creating...' : 'Create Class'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <OtpInput
            length={6}
            label="Class Code"
            helperText="Enter the 6-digit code to join a class"
            onComplete={(code) => setClassCode(code)}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-[#ACACAC] text-secondary-black"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleJoinClass}
              className="bg-[#058F3A] text-white"
              disabled={!classCode || classCode.length !== 6}
            >
              Join Class
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ClassModal;
