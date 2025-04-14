"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Switch, Toast, Loader } from "@/components/ui";
import { User, PenSquare, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import EditProfileDetail from "./components/edit-profile-detail";
import DeleteAccountModal from "./components/delete-account-modal";
import { useInitAuthUser } from "@/services/features/auth";
import { useUpdateProfile, useDeleteAccount } from "@/services/features/users";
import { toast, useToast } from "@/components/ui/toast";

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

  // Setup state for user profile
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    birthday: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Update local state when user data is loaded
  useEffect(() => {
    if (userData) {
      setUserProfile({
        fullName: String(userData?.name || ""),
        username: String(userData?.username || ""),
        email: String(userData?.email || ""),
        birthday: String(userData?.birthday || ""),
      });
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

    // Update local state first
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Map local field names to API field names
    const fieldMap: Record<string, string> = {
      fullName: "name",
      username: "username",
      email: "email",
      birthday: "birthday",
    };

    console.log(fieldMap[field], value);

    // Call API to update the profile
    updateProfile(
      { [fieldMap[field]]: value, _id: userData?._id },
      {
        onSuccess: () => {
          toast({
            title: "Profile Updated",
            description: `Your ${field} has been updated successfully.`,
          });
        },
        onError: (error) => {
          toast({
            title: "Update Failed",
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
          localStorage.removeItem("authToken");
          dispatch(logout());

          toast({
            title: "Account Deleted",
            description: "Your account has been deleted successfully.",
            type: "success",
          });

          // Redirect to home page
          window.location.href = "/";
          resolve(true);
        },
        onError: (error) => {
          toast({
            title: "Delete Failed",
            description: error.message || "Failed to delete your account.",
            type: "error",
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

  if (isLoadingUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader size="large" />
          <p className="text-lg text-[#444444]">Loading your profile...</p>
        </div>
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
            <div className="relative h-[96px] w-[96px] bg-gray-200 rounded-full flex flex-col items-center justify-center">
              <User height={57} width={57} className="text-gray-500" />
              <div className="h-[2px] w-9/12 bg-[#444]" />
              <button className="absolute cursor-pointer z-10 bottom-0 text-[14px] text-[#444444]">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <EditProfileDetail
            label="Full Name"
            value={userProfile.fullName}
            accentLabel={true}
            onSave={(value) => handleUpdateProfile("fullName", value)}
          />

          <EditProfileDetail
            label="Username"
            value={userProfile.username}
            onSave={(value) => handleUpdateProfile("username", value)}
          />

          <EditProfileDetail
            label="Email"
            value={userProfile.email}
            fieldType="email"
            onSave={(value) => handleUpdateProfile("email", value)}
          />

          <EditProfileDetail
            label="Birthday"
            value={userProfile.birthday}
            fieldType="date"
            onSave={(value) => handleUpdateProfile("birthday", value)}
          />
        </div>
      </div>

      {/* Account & Privacy */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-[18px] font-medium text-secondary-black mb-4">
          Account & Privacy
        </h2>

        <div className="space-y-4">
          <button className="text-[#0890A8] font-medium text-[18px]">
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
    </div>
  );
};

export default AccountSettings;
