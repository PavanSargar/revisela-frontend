import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Dropdown } from "../ui";
import Logo from "@/assets/icons/revisela-logo.png";
import { useLogout } from "@/services/features/auth";

type Props = {};

const RootNavbar = (props: Props) => {
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleAccountSettingsClick = () => {
    router.push("/account-settings");
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        window.location.href = "/auth";
      },
    });
  };

  return (
    <div className="fixed z-[100] h-[77px] top-0 left-0 right-0 flex items-center justify-between px-[15px] sm:px-[30px] py-[22px] bg-white">
      <Image src={Logo} alt="Logo" />

      {/* Search bar */}
      <div className="relative max-w-[504px] w-full mx-4">
        <div className="flex items-center relative">
          <div className="absolute left-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for Quiz Sets, People, Subjects..."
            className="w-full py-2 px-10 border rounded-full bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-2">
        <Button className="h-10 rounded-full px-4 flex items-center gap-2 bg-purple-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Explore
        </Button>
        <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-500 text-white p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </Button>

        {/* Profile dropdown - using our custom Dropdown component */}
        <Dropdown
          trigger={
            <Button
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-0 focus:outline-none"
              aria-label="User options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Button>
          }
          items={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Account Settings
                </div>
              ),
              onClick: handleAccountSettingsClick,
              className: "text-[15px] text-secondary-black",
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
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
