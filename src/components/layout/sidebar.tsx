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

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("/");
  const [showClasses, setShowClasses] = useState(false);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const isActive = (path: string) => {
    return activeTab === path;
  };

  const activeItemStyle = "bg-[#0890A8] text-white";
  const inactiveItemStyle = "text-secondary-black hover:bg-light-gray";

  return (
    <aside className="fixed top-[3.75rem] left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-10 overflow-y-auto hide-scrollbar">
      <div className="flex flex-col p-4">
        <nav className="space-y-2">
          {/* Main Navigation */}
          <Link
            href="/"
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive("/") ? activeItemStyle : inactiveItemStyle
            }`}
          >
            <Home size={20} />
            <span className="text-[16px]">Home</span>
          </Link>

          <Link
            href="/library"
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive("/library") ? activeItemStyle : inactiveItemStyle
            }`}
          >
            <Library size={20} />
            <span className="text-[16px]">My Library</span>
          </Link>

          <Link
            href="/shared"
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive("/shared") ? activeItemStyle : inactiveItemStyle
            }`}
          >
            <Users size={20} />
            <span className="text-[16px]">Shared With Me</span>
          </Link>

          <Link
            href="/bookmarks"
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive("/bookmarks") ? activeItemStyle : inactiveItemStyle
            }`}
          >
            <Bookmark size={20} />
            <span className="text-[16px]">Bookmarked</span>
          </Link>

          <Link
            href="/recent"
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive("/recent") ? activeItemStyle : inactiveItemStyle
            }`}
          >
            <Clock size={20} />
            <span className="text-[16px]">Recent</span>
          </Link>

          <Link
            href="/trash"
            className={`flex items-center gap-3 p-2 rounded-md ${
              isActive("/trash") ? activeItemStyle : inactiveItemStyle
            }`}
          >
            <Trash size={20} />
            <span className="text-[16px]">Trash</span>
          </Link>
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
              <Link
                href="/classes/bio"
                className={`flex items-center gap-3 p-2 rounded-md ${
                  isActive("/classes/bio")
                    ? "bg-[#0890A8] text-white"
                    : "hover:bg-light-gray"
                }`}
              >
                <div
                  className={`p-1 rounded ${
                    isActive("/classes/bio")
                      ? "bg-[#0890A8]"
                      : "bg-[#0890A8] bg-opacity-10"
                  }`}
                >
                  <FolderOpen
                    size={18}
                    className={
                      isActive("/classes/bio") ? "text-white" : "text-[#0890A8]"
                    }
                  />
                </div>
                <span
                  className={`text-[16px] ${
                    isActive("/classes/bio") ? "font-medium" : "text-[#0890A8]"
                  }`}
                >
                  Bio Class UCLA
                </span>
              </Link>

              <Link
                href="/classes/maths"
                className={`flex items-center gap-3 p-2 rounded-md ${
                  isActive("/classes/maths")
                    ? "bg-[#0890A8] text-white"
                    : "hover:bg-light-gray"
                }`}
              >
                <div
                  className={`p-1 rounded ${
                    isActive("/classes/maths")
                      ? "bg-[#0890A8]"
                      : "bg-[#0890A8] bg-opacity-10"
                  }`}
                >
                  <FolderOpen
                    size={18}
                    className={
                      isActive("/classes/maths")
                        ? "text-white"
                        : "text-[#0890A8]"
                    }
                  />
                </div>
                <span
                  className={`text-[16px] ${
                    isActive("/classes/maths")
                      ? "font-medium"
                      : "text-[#0890A8]"
                  }`}
                >
                  Maths Class UCLA
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
