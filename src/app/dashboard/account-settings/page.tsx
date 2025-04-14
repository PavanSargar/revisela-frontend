"use client";
import React, { useState, useEffect } from "react";
import { Switch, Loader } from "@/components/ui";
import { User, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import EditProfileDetail from "./components/edit-profile-detail";
import DeleteAccountModal from "./components/delete-account-modal";
import ChangePasswordModal from "./components/change-password-modal";
import { useInitAuthUser } from "@/services/features/auth";
import { useUpdateProfile, useDeleteAccount } from "@/services/features/users";
import { useToast } from "@/components/ui/toast";
import { formatToDDMMMYYYY } from "@/lib/utils";

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

  // Add state to track if fields have been changed already
  const [fieldEditHistory, setFieldEditHistory] = useState<
    Record<string, boolean>
  >({});

  // Setup state for user profile
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    birthday: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Update local state when user data is loaded
  useEffect(() => {
    if (userData) {
      setUserProfile({
        fullName: String(userData?.name || ""),
        username: String(userData?.username || ""),
        email: String(userData?.email || ""),
        birthday: formatToDDMMMYYYY(String(userData?.birthday || "")),
      });

      // Load edit history from localStorage
      const storedHistory = localStorage.getItem(`editHistory_${userData._id}`);
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
      (field === "fullName" || field === "birthday") &&
      fieldEditHistory[field]
    ) {
      toast({
        title: "Edit Restricted",
        description: `Your ${
          field === "fullName" ? "full name" : "birthday"
        } can only be changed once.`,
        type: "error",
      });
      return;
    }

    // Validate fields based on their type
    if (value.trim() === "") {
      toast({
        title: "Validation Error",
        description: `${field} cannot be empty.`,
        type: "error",
      });
      return;
    }

    // Field-specific validation
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    if (field === "username" && !/^[a-zA-Z0-9_]+$/.test(value)) {
      toast({
        title: "Validation Error",
        description:
          "Username can only contain letters, numbers, and underscores.",
        type: "error",
      });
      return;
    }

    // Birthday validation (assuming DD-MMM-YYYY format)
    if (field === "birthday") {
      try {
        // Simple format check for DD-MMM-YYYY
        if (!/^\d{2}-[A-Za-z]{3}-\d{4}$/.test(value)) {
          throw new Error("Invalid date format");
        }
      } catch (error) {
        toast({
          title: "Validation Error",
          description: "Invalid date format. Please use DD-MMM-YYYY format.",
          type: "error",
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
      fullName: "name",
      username: "username",
      email: "email",
      birthday: "birthday",
    };

    // Call API to update the profile
    updateProfile(
      { [fieldMap[field]]: value, _id: userData?._id },
      {
        onSuccess: () => {
          // If this is a restricted field, mark it as changed in history
          if (field === "fullName" || field === "birthday") {
            const updatedHistory = { ...fieldEditHistory, [field]: true };
            setFieldEditHistory(updatedHistory);

            // Store in localStorage to persist across sessions
            if (userData?._id) {
              localStorage.setItem(
                `editHistory_${userData._id}`,
                JSON.stringify(updatedHistory)
              );
            }

            toast({
              title: "Profile Updated",
              description: `Your ${field} has been updated. Note that this field can only be changed once.`,
            });
          } else {
            toast({
              title: "Profile Updated",
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

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = (open: boolean) => {
    setIsPasswordModalOpen(open);
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
            disabled={fieldEditHistory.fullName}
            editHint={
              fieldEditHistory.fullName ? "Can only be changed once" : undefined
            }
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
            disabled={fieldEditHistory.birthday}
            editHint={
              fieldEditHistory.birthday ? "Can only be changed once" : undefined
            }
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
