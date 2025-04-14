import React, { useState, useEffect } from "react";
import {
  Home,
  Library,
  Users,
  Bookmark,
  Clock,
  Trash,
  FolderOpen,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      path: "/dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
    },
    {
      path: "/dashboard/library",
      label: "My Library",
      icon: <Library size={20} />,
    },
    {
      path: "/dashboard/shared",
      label: "Shared With Me",
      icon: <Users size={20} />,
    },
    {
      path: "/dashboard/bookmarks",
      label: "Bookmarked",
      icon: <Bookmark size={20} />,
    },
    {
      path: "/dashboard/recent",
      label: "Recent",
      icon: <Clock size={20} />,
    },
    {
      path: "/dashboard/trash",
      label: "Trash",
      icon: <Trash size={20} />,
    },
  ];

  // Class menu items
  const classMenuItems: MenuItem[] = [
    {
      path: "/dashboard/classes/bio",
      label: "Bio Class UCLA",
      icon: <FolderOpen size={18} />,
    },
    {
      path: "/dashboard/classes/maths",
      label: "Maths Class UCLA",
      icon: <FolderOpen size={18} />,
    },
  ];

  return (
    <aside className="fixed top-[3.75rem] z-50 left-0 h-full w-64 bg-[#FAFAFA] overflow-y-auto hide-scrollbar">
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

          {/* Joined Classes */}
          {showClasses && (
            <div className="ml-5 space-y-2 mt-2">
              {classMenuItems.map((item) => (
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
                        isActive(item.path) ? "text-white" : "text-[#0890A8]"
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
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
