import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Dropdown } from "../ui";
import Logo from "@/assets/icons/revisela-logo.png";
import { useLogout } from "@/services/features/auth";
import { Folder, GraduationCap } from "lucide-react";
import {
  SearchIcon,
  GlobeIcon,
  PlusIcon,
  FileDocumentIcon,
  UserIcon,
  EditIcon,
  LogoutIcon,
} from "@/components/icons";

type Props = {};

const RootNavbar = (props: Props) => {
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleAccountSettingsClick = () => {
    router.push("/dashboard/account-settings");
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        window.location.href = "/auth";
      },
    });
  };

  const handleCreateQuizSet = () => {
    router.push("/dashboard/quiz-sets/create");
  };

  const handleCreateFolder = () => {
    router.push("/dashboard/library?createFolder=true");
  };

  const handleCreateClass = () => {
    router.push("/dashboard/classes/create");
  };

  return (
    <div className="fixed z-[100] h-[77px] top-0 left-0 right-0 flex items-center justify-between px-[15px] sm:px-[30px] py-[22px] bg-white">
      <Image src={Logo} alt="Logo" />

      {/* Search bar */}
      <div className="relative max-w-[504px] w-full mx-4">
        <div className="flex items-center relative">
          <div className="absolute left-3">
            <SearchIcon size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for Quiz Sets, People, Subjects..."
            className="w-full py-2 px-10 border rounded-full bg-white focus:outline-none cursor-text"
          />
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-2">
        <Button className="h-10 rounded-full px-4 flex items-center gap-2 bg-purple-600 text-white">
          <GlobeIcon size={20} />
          Explore
        </Button>

        {/* Plus button with dropdown */}
        <Dropdown
          trigger={
            <Button
              className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-500 text-white p-0"
              aria-label="Create new"
            >
              <PlusIcon size={24} />
            </Button>
          }
          items={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <FileDocumentIcon size={16} />
                  Quiz Set
                </div>
              ),
              onClick: handleCreateQuizSet,
              className: "text-[15px] text-secondary-black",
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <Folder size={16} />
                  Folder
                </div>
              ),
              onClick: handleCreateFolder,
              className: "text-[15px] text-secondary-black",
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} />
                  Class
                </div>
              ),
              onClick: handleCreateClass,
              className: "text-[15px] text-secondary-black",
            },
          ]}
        />

        {/* Profile dropdown - using our custom Dropdown component */}
        <Dropdown
          trigger={
            <Button
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-0 focus:outline-none"
              aria-label="User options"
            >
              <UserIcon size={24} />
            </Button>
          }
          items={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <EditIcon size={16} />
                  Account Settings
                </div>
              ),
              onClick: handleAccountSettingsClick,
              className: "text-[15px] text-secondary-black",
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <LogoutIcon size={16} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </div>
              ),
              onClick: handleLogout,
              disabled: isLoggingOut,
              className: "text-[15px] text-red-500",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RootNavbar;
