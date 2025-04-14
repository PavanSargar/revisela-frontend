"use client";
import React, { useState } from "react";
import { Input, Button, Switch } from "@/components/ui";
import { User, PenSquare, Trash2 } from "lucide-react";
import { useAppSelector } from "@/store";
import EditProfileDetail from "./components/edit-profile-detail";
import DeleteAccountModal from "./components/delete-account-modal";

const AccountSettings = () => {
  // In a real app, we would fetch this from the API or Redux store
  const [userProfile, setUserProfile] = useState({
    fullName: "Harsh Fernandes",
    username: "Harsh",
    email: "Harsh1192@gmail.com",
    birthday: "01-Jan-2001",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
  };

  const handleUpdateProfile = (
    field: keyof typeof userProfile,
    value: string
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    // In a real app, you would also make an API call to update the user profile
  };

  const handleDeleteAccount = async () => {
    // In a real app, you would make an API call to delete the user's account
    console.log("Deleting account...");
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (open: boolean) => {
    setIsDeleteModalOpen(open);
  };

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
