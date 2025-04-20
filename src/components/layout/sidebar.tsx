"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Library,
  Users,
  Bookmark,
  Clock,
  Trash,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { ClassModal } from "@/components/modals";

type Props = {};

// Define menu item type
type MenuItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("/dashboard");
  const [showClasses, setShowClasses] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [classModalType, setClassModalType] = useState<"create" | "join">(
    "create"
  );

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const isActive = (path: string) => {
    return activeTab === path;
  };

  const activeItemStyle = "bg-[#0890A8] text-white";
  const inactiveItemStyle =
    "text-secondary-black hover:bg-[#0890A8]/10 hover:text-[#0890A8] cursor-pointer";

  // Main navigation menu items
  const mainMenuItems: MenuItem[] = [
    {
      path: ROUTES.DASHBOARD.HOME,
      label: "Dashboard",
      icon: <Home size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.LIBRARY,
      label: "My Library",
      icon: <Library size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.SHARED,
      label: "Shared With Me",
      icon: <Users size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.BOOKMARKS,
      label: "Bookmarked",
      icon: <Bookmark size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.RECENT,
      label: "Recent",
      icon: <Clock size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.TRASH,
      label: "Trash",
      icon: <Trash size={20} />,
    },
  ];

  // Class menu items mock
  const classMenuItems: MenuItem[] = [
    // {
    //   path: "/dashboard/classes/bio",
    //   label: "Bio Class UCLA",
    //   icon: <FolderOpen size={18} />,
    // },
    // {
    //   path: "/dashboard/classes/maths",
    //   label: "Maths Class UCLA",
    //   icon: <FolderOpen size={18} />,
    // },
  ];

  // Check if user has any classes
  const hasClasses = classMenuItems.length > 0;

  const handleCreateClass = () => {
    setClassModalType("create");
    setIsClassModalOpen(true);
  };

  const handleJoinClass = () => {
    setClassModalType("join");
    setIsClassModalOpen(true);
  };

  return (
    <>
      <aside className="fixed top-[5rem] z-50 left-0 h-full w-64 bg-[#FAFAFA] overflow-y-auto hide-scrollbar">
        <div className="flex flex-col p-4">
          <nav className="space-y-2">
            {/* Main Navigation */}
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 p-2 rounded-md ${
                  isActive(item.path) ? activeItemStyle : inactiveItemStyle
                }`}
              >
                {item.icon}
                <span className="text-[16px]">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="my-4 border-t border-gray-200"></div>

          {/* My Classes Section */}
          <div className="space-y-2">
            <button
              onClick={() => setShowClasses(!showClasses)}
              className={`flex w-full items-center gap-3 p-2 rounded-md ${
                pathname.includes("/classes")
                  ? activeItemStyle
                  : inactiveItemStyle
              }`}
            >
              <GraduationCap size={20} />
              <span className="text-[16px]">My Classes</span>
              <span className="ml-auto">{showClasses ? "▲" : "▼"}</span>
            </button>

            {/* Joined Classes or Empty State */}
            {showClasses && (
              <div className="ml-5 space-y-2 mt-2">
                {hasClasses ? (
                  // Display classes when available
                  classMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 p-2 rounded-md ${
                        isActive(item.path)
                          ? "bg-[#0890A8] text-white"
                          : "hover:bg-[#0890A8]/10 hover:text-[#0890A8] cursor-pointer"
                      }`}
                    >
                      <div
                        className={`p-1 rounded ${
                          isActive(item.path)
                            ? "bg-[#0890A8]"
                            : "bg-[#0890A8] bg-opacity-10"
                        }`}
                      >
                        <div
                          className={
                            isActive(item.path)
                              ? "text-white"
                              : "text-[#0890A8]"
                          }
                        >
                          {item.icon}
                        </div>
                      </div>
                      <span
                        className={`text-[16px] ${
                          isActive(item.path) ? "font-medium" : "text-[#0890A8]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))
                ) : (
                  // Empty state when no classes
                  <div className="flex flex-col gap-3">
                    <div className="text-gray-500 text-center p-2 border border-gray-200 rounded-md bg-white">
                      You haven't joined or created any classes yet.
                    </div>
                    <button
                      onClick={handleCreateClass}
                      className="flex items-center justify-center gap-2 p-3 rounded-md bg-[#0890A8] text-white"
                    >
                      <span className="text-white text-sm">Create A Class</span>
                    </button>
                    <button
                      onClick={handleJoinClass}
                      className="flex items-center justify-center gap-2 p-3 rounded-md bg-[#058F3A] text-white"
                    >
                      <span className="text-white text-sm">Join A Class</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      <ClassModal
        isOpen={isClassModalOpen}
        onOpenChange={setIsClassModalOpen}
        type={classModalType}
      />
    </>
  );
};

export default Sidebar;
