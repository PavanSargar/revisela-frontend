'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import {
  Bookmark,
  Clock,
  FolderOpen,
  GraduationCap,
  Home,
  Library,
  Trash,
  Users,
} from 'lucide-react';

import { useMyClasses } from '@/services/features/classes';

import { ClassModal } from '@/components/modals';

import { ROUTES } from '@/constants/routes';

type MenuItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('/dashboard');
  const [showClasses, setShowClasses] = useState(false);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [classModalType, setClassModalType] = useState<'create' | 'join'>(
    'create'
  );

  // Fetch user's classes - only when showClasses is true
  const { data: classes, isLoading: loadingClasses } = useMyClasses({
    enabled: showClasses,
  });

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const isActive = (path: string) => {
    return activeTab === path;
  };

  const activeItemStyle = 'bg-[#0890A8] text-white';
  const inactiveItemStyle =
    'text-secondary-black hover:bg-[#0890A8]/10 hover:text-[#0890A8] cursor-pointer';

  // Main navigation menu items
  const mainMenuItems: MenuItem[] = [
    {
      path: ROUTES.DASHBOARD.HOME,
      label: 'Dashboard',
      icon: <Home size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.LIBRARY,
      label: 'My Library',
      icon: <Library size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.SHARED,
      label: 'Shared With Me',
      icon: <Users size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.BOOKMARKS,
      label: 'Bookmarked',
      icon: <Bookmark size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.RECENT,
      label: 'Recent',
      icon: <Clock size={20} />,
    },
    {
      path: ROUTES.DASHBOARD.TRASH,
      label: 'Trash',
      icon: <Trash size={20} />,
    },
  ];

  // Convert classes to menu items
  console.log(`classes: `, classes);
  const classMenuItems: MenuItem[] = useMemo(
    () =>
      classes?.map((classItem) => ({
        path: `${ROUTES.DASHBOARD.CLASSES.ROOT}/${classItem._id}`,
        label: classItem.name,
        icon: <FolderOpen size={18} />,
      })) || [],
    [classes]
  );

  // Check if user has any classes
  const hasClasses = classes && classes.length > 0;
  const hasMoreThanTwoClasses = classes && classes.length > 2;

  // Get classes to display based on showAllClasses state
  const displayedClasses = useMemo(() => {
    if (!hasMoreThanTwoClasses || showAllClasses) {
      return classMenuItems;
    }
    return classMenuItems.slice(0, 2);
  }, [classMenuItems, hasMoreThanTwoClasses, showAllClasses]);

  const handleCreateClass = () => {
    setClassModalType('create');
    setIsClassModalOpen(true);
  };

  const handleJoinClass = () => {
    setClassModalType('join');
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
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowClasses(!showClasses)}
                className="flex items-center gap-2 text-secondary-black hover:text-[#0890A8] cursor-pointer"
              >
                <GraduationCap size={20} />
                <span className="text-[16px] font-medium">My Classes</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showClasses ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Classes count badge */}
              {hasClasses && (
                <span className="bg-[#0890A8] text-white text-xs px-2 py-1 rounded-full">
                  {classes.length}
                </span>
              )}
            </div>

            {showClasses && (
              <div className="ml-4 space-y-1">
                {loadingClasses ? (
                  <div className="text-gray-500 text-sm p-2">
                    Loading classes...
                  </div>
                ) : hasClasses ? (
                  // Show actual classes
                  <>
                    <div className="space-y-1 overflow-hidden">
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          showAllClasses || !hasMoreThanTwoClasses
                            ? 'max-h-none opacity-100'
                            : 'max-h-[4.5rem] opacity-100'
                        }`}
                        style={{
                          maxHeight:
                            showAllClasses || !hasMoreThanTwoClasses
                              ? `${classMenuItems.length * 2.5}rem`
                              : '4.5rem',
                        }}
                      >
                        {classMenuItems.map((item, index) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 p-2 rounded-md text-sm transition-all duration-200 ${
                              isActive(item.path)
                                ? activeItemStyle
                                : inactiveItemStyle
                            } ${
                              !showAllClasses &&
                              hasMoreThanTwoClasses &&
                              index >= 2
                                ? 'opacity-0 translate-y-2'
                                : 'opacity-100 translate-y-0'
                            }`}
                            style={{
                              transitionDelay: showAllClasses
                                ? `${index * 50}ms`
                                : '0ms',
                            }}
                          >
                            {item.icon}
                            <span className="truncate">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* View More/Less button */}
                    {hasMoreThanTwoClasses && (
                      <button
                        onClick={() => setShowAllClasses(!showAllClasses)}
                        className="flex items-center justify-center gap-2 p-2 rounded-md text-sm text-[#0890A8] hover:bg-[#0890A8]/10 transition-all duration-200 mt-2 group"
                      >
                        <span
                          className={`text-xs transition-transform duration-200 ${
                            showAllClasses ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          ↓
                        </span>
                        <span>
                          {showAllClasses
                            ? 'View Less'
                            : `View More (${classes.length - 2} more)`}
                        </span>
                      </button>
                    )}

                    {/* Always show Create and Join buttons */}
                    <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={handleCreateClass}
                        className="flex items-center justify-center gap-2 p-3 rounded-md bg-[#0890A8] text-white hover:bg-[#0890A8]/90 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        <span className="text-white text-sm">
                          Create A Class
                        </span>
                      </button>
                      <button
                        onClick={handleJoinClass}
                        className="flex items-center justify-center gap-2 p-3 rounded-md bg-[#058F3A] text-white hover:bg-[#058F3A]/90 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        <span className="text-white text-sm">Join A Class</span>
                      </button>
                    </div>
                  </>
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
