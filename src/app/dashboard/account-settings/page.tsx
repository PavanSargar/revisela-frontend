'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { Trash2, Upload, User } from 'lucide-react';

import { useInitAuthUser } from '@/services/features/auth';
import { useUploadProfileImageAlt } from '@/services/features/uploads';
import { useDeleteAccount, useUpdateProfile } from '@/services/features/users';

import { Switch } from '@/components/ui';
import { ContentLoader, LoadingSpinner } from '@/components/ui/loaders';
import { useToast } from '@/components/ui/toast';

import { logout, updateProfileImage } from '@/store/slices/authSlice';

import { formatToDDMMMYYYY, safeLocalStorage } from '@/lib/utils';

import { useAppDispatch } from '@/store';

import ChangePasswordModal from './components/change-password-modal';
import DeleteAccountModal from './components/delete-account-modal';
import EditProfileDetail from './components/edit-profile-detail';

const AccountSettings = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  // Fetch current user data
  const {
    data: userData,
    isLoading: isLoadingUser,
    isError,
  } = useInitAuthUser();

  // Setup mutations
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { mutate: uploadProfileImage, isPending: isUploadingProfileImage } =
    useUploadProfileImageAlt();

  // Add state to track if fields have been changed already
  const [fieldEditHistory, setFieldEditHistory] = useState<
    Record<string, boolean>
  >({});

  // Setup state for user profile
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    username: '',
    email: '',
    birthday: '',
    profileImage: '',
  });

  // Add state for profile image
  const [profileImage, setProfileImage] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Update local state when user data is loaded
  useEffect(() => {
    if (userData) {
      setUserProfile({
        fullName: String(userData?.name || ''),
        username: String(userData?.username || ''),
        email: String(userData?.email || ''),
        birthday: formatToDDMMMYYYY(String(userData?.birthday || '')),
        profileImage: String(userData?.profileImage || ''),
      });

      // Set profile image if it exists
      if (userData?.profileImage) {
        setProfileImage(userData.profileImage);
      }

      // Load edit history from safeLocalStorage
      const storedHistory = safeLocalStorage.getItem(
        `editHistory_${userData._id}`
      );
      if (storedHistory) {
        setFieldEditHistory(JSON.parse(storedHistory));
      }
    }
  }, [userData]);

  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    // You could also save this preference to the API if there's an endpoint for it
  };

  const handleUpdateProfile = (
    field: keyof typeof userProfile,
    value: string
  ) => {
    // Check if value has actually changed before proceeding
    if (userProfile[field] === value) {
      return; // No change, don't update
    }

    // Check if restricted fields (fullName, birthday) have already been changed once
    if (
      (field === 'fullName' || field === 'birthday') &&
      fieldEditHistory[field]
    ) {
      toast({
        title: 'Edit Restricted',
        description: `Your ${
          field === 'fullName' ? 'full name' : 'birthday'
        } can only be changed once.`,
        type: 'error',
      });
      return;
    }

    // Validate fields based on their type
    if (value.trim() === '') {
      toast({
        title: 'Validation Error',
        description: `${field} cannot be empty.`,
        type: 'error',
      });
      return;
    }

    // Field-specific validation
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    if (field === 'username' && !/^[a-zA-Z0-9_]+$/.test(value)) {
      toast({
        title: 'Validation Error',
        description:
          'Username can only contain letters, numbers, and underscores.',
        type: 'error',
      });
      return;
    }

    // Birthday validation (assuming DD-MMM-YYYY format)
    if (field === 'birthday') {
      try {
        // Simple format check for DD-MMM-YYYY
        if (!/^\d{2}-[A-Za-z]{3}-\d{4}$/.test(value)) {
          throw new Error('Invalid date format');
        }
      } catch (error) {
        toast({
          title: 'Validation Error',
          description: 'Invalid date format. Please use DD-MMM-YYYY format.',
          type: 'error',
        });
        return;
      }
    }

    // Update local state first
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Map local field names to API field names
    const fieldMap: Record<string, string> = {
      fullName: 'name',
      username: 'username',
      email: 'email',
      birthday: 'birthday',
    };

    // Call API to update the profile
    updateProfile(
      { [fieldMap[field]]: value, _id: userData?._id },
      {
        onSuccess: () => {
          // If this is a restricted field, mark it as changed in history
          if (field === 'fullName' || field === 'birthday') {
            const updatedHistory = { ...fieldEditHistory, [field]: true };
            setFieldEditHistory(updatedHistory);

            // Store in safeLocalStorage to persist across sessions
            if (userData?._id) {
              safeLocalStorage.setItem(
                `editHistory_${userData._id}`,
                JSON.stringify(updatedHistory)
              );
            }

            toast({
              title: 'Profile Updated',
              description: `Your ${field} has been updated. Note that this field can only be changed once.`,
            });
          } else {
            toast({
              title: 'Profile Updated',
              description: `Your ${field} has been updated successfully.`,
            });
          }
        },
        onError: (error) => {
          // Revert local state on error
          setUserProfile((prev) => ({
            ...prev,
            [field]: userProfile[field], // Revert to previous value
          }));

          toast({
            title: 'Update Failed',
            description: error.message || `Failed to update ${field}.`,
          });
        },
      }
    );
  };

  const handleDeleteAccount = async () => {
    return new Promise((resolve, reject) => {
      deleteAccount(undefined, {
        onSuccess: () => {
          // Clear auth state
          safeLocalStorage.removeItem('authToken');
          dispatch(logout());

          toast({
            title: 'Account Deleted',
            description: 'Your account has been deleted successfully.',
            type: 'success',
          });

          // Redirect to home page
          window.location.href = '/';
          resolve(true);
        },
        onError: (error) => {
          toast({
            title: 'Delete Failed',
            description: error.message || 'Failed to delete your account.',
            type: 'error',
          });
          reject(error);
        },
      });
    });
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (open: boolean) => {
    setIsDeleteModalOpen(open);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = (open: boolean) => {
    setIsPasswordModalOpen(open);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      // Use the uploadProfileImage mutation
      uploadProfileImage(
        { file },
        {
          onSuccess: (data) => {
            setProfileImage(data?.url || '');
            dispatch(updateProfileImage(data?.url || ''));
            toast({
              title: 'Profile Updated',
              description: 'Your profile image has been updated successfully.',
            });
          },
          onError: (error) => {
            toast({
              title: 'Upload Failed',
              description: error.message || 'Failed to upload image.',
              type: 'error',
            });
          },
          onSettled: () => {
            setIsUploadingImage(false);
          },
        }
      );
    } catch (error: any) {
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload image.',
        type: 'error',
      });
      setIsUploadingImage(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoadingUser) {
    return (
      <div className="h-screen">
        <ContentLoader
          message="Loading your profile..."
          size="lg"
          variant="primary"
          className="h-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-[18px] font-semibold text-[#0890A8] mb-6">
        Account Settings
      </h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-[18px] font-medium text-secondary-black mb-4">
          Profile Section
        </h2>

        <div className="flex items-center mb-6">
          <div className="">
            <div className="relative h-[96px] w-[96px] bg-gray-200 rounded-full flex flex-col items-center justify-center overflow-hidden">
              {profileImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className={`h-full w-full object-cover ${
                      isUploadingImage ? 'blur-sm' : ''
                    }`}
                    width={96}
                    height={96}
                  />
                  {isUploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <LoadingSpinner size="sm" variant="light" />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <User height={57} width={57} className="text-gray-500" />
                  <div className="h-[2px] w-9/12 bg-[#444]" />
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/png,image/jpeg,image/gif"
                className="hidden"
              />
              <button
                className="absolute cursor-pointer z-10 bottom-0 left-0 right-0 text-[14px] text-white bg-black bg-opacity-50 py-1 rounded-b-full"
                onClick={triggerFileInput}
                disabled={isUploadingImage}
              >
                {isUploadingImage ? (
                  <div className="flex items-center justify-center text-[12px]">
                    <span className="mr-1">Uploading</span>
                    <span className="animate-pulse">...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-[12px]">
                    <Upload size={14} className="mr-1" />
                    {profileImage ? 'Change' : 'Upload'}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <EditProfileDetail
            label="Full Name"
            value={userProfile.fullName}
            accentLabel={true}
            disabled={fieldEditHistory.fullName}
            editHint={
              fieldEditHistory.fullName ? 'Can only be changed once' : undefined
            }
            onSave={(value) => handleUpdateProfile('fullName', value)}
          />

          <EditProfileDetail
            label="Username"
            value={userProfile.username}
            onSave={(value) => handleUpdateProfile('username', value)}
          />

          <EditProfileDetail
            label="Email"
            value={userProfile.email}
            fieldType="email"
            onSave={(value) => handleUpdateProfile('email', value)}
          />

          <EditProfileDetail
            label="Birthday"
            value={userProfile.birthday}
            fieldType="date"
            disabled={fieldEditHistory.birthday}
            editHint={
              fieldEditHistory.birthday ? 'Can only be changed once' : undefined
            }
            onSave={(value) => handleUpdateProfile('birthday', value)}
          />
        </div>
      </div>

      {/* Account & Privacy */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-[18px] font-medium text-secondary-black mb-4">
          Account & Privacy
        </h2>

        <div className="space-y-4">
          <button
            className="text-[#0890A8] font-medium text-[18px]"
            onClick={handleOpenPasswordModal}
          >
            Change/Create Password
          </button>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-secondary-black font-medium text-[18px]">
                  Delete Account
                </p>
                <p className="text-[18px] text-neutral-gray">
                  This will delete all your data and cannot be undone.
                </p>
              </div>
              <button
                className="text-red-500 cursor-pointer"
                onClick={handleOpenDeleteModal}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-[18px] font-medium text-secondary-black mb-4">
          Notifications
        </h2>

        <Switch
          label="Allow Revisela to share Updates, Marketing Material and Offers to your email."
          description="We promise to not be annoying!"
          checked={notificationsEnabled}
          onCheckedChange={handleToggleNotifications}
        />
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onOpenChange={handleCloseDeleteModal}
        onDelete={handleDeleteAccount}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onOpenChange={handleClosePasswordModal}
        userId={userData?._id as string}
      />
    </div>
  );
};

export default AccountSettings;
