'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Edit,
  MoreVertical,
  Settings,
  Share,
  Users,
} from 'lucide-react';

import { useClass, useClassQuizzes } from '@/services/features/classes';

import { Button } from '@/components/ui';
import { ContentLoader } from '@/components/ui/loaders';
import { useToast } from '@/components/ui/toast';

import { ROUTES } from '@/constants/routes';

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const classId = params.classId as string;

  const [activeTab, setActiveTab] = useState<
    'overview' | 'quizzes' | 'members'
  >('overview');

  const {
    data: classData,
    isLoading: loadingClass,
    error: classError,
  } = useClass(classId);
  const { data: quizzes, isLoading: loadingQuizzes } = useClassQuizzes(classId);

  const handleBack = () => {
    router.push(ROUTES.DASHBOARD.CLASSES.ROOT);
  };

  const handleCopyClassCode = () => {
    // TODO: Implement class code functionality when available
    toast({
      title: 'Info',
      description: 'Class code functionality will be implemented soon',
      type: 'info',
    });
  };

  const handleShareClass = () => {
    // TODO: Implement share functionality
    toast({
      title: 'Info',
      description: 'Share functionality will be implemented soon',
      type: 'info',
    });
  };

  if (loadingClass) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ContentLoader
          message="Loading class details..."
          size="lg"
          variant="primary"
        />
      </div>
    );
  }

  if (classError || !classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load class</p>
          <p className="text-sm text-gray-500">
            Class not found or you don't have access
          </p>
          <Button onClick={handleBack} className="mt-4" variant="outline">
            Back to Classes
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = classData?.isOwner || false; // Use the isOwner property from API
  const memberCount = classData.memberCount || 0;
  const quizCount = Array.isArray(quizzes) ? quizzes.length : 0;

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Classes
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold">{classData.name}</h1>
              {classData.classCode && (
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Code: {classData.classCode}
                </span>
              )}
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  classData.publicAccess === 'public'
                    ? 'bg-green-100 text-green-800'
                    : classData.publicAccess === 'restricted'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {classData.publicAccess === 'public'
                  ? 'Public'
                  : classData.publicAccess === 'restricted'
                    ? 'Restricted'
                    : 'Private'}
              </span>
            </div>

            {classData.description && (
              <p className="text-[#444444] mb-3">{classData.description}</p>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>
                  {memberCount} member{memberCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>
                  {quizCount} quiz{quizCount !== 1 ? 'zes' : ''}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>
                  Created {new Date(classData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleShareClass}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share size={16} />
              Share
            </Button>

            {isOwner && (
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                Settings
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
            { id: 'quizzes', label: 'Quizzes', icon: <BookOpen size={16} /> },
            { id: 'members', label: 'Members', icon: <Users size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#0890A8] text-[#0890A8]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Class Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Class Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-medium">{memberCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Quizzes</span>
                  <span className="font-medium">{quizCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class Type</span>
                  <span className="font-medium">
                    {classData.publicAccess === 'public'
                      ? 'Public'
                      : classData.publicAccess === 'restricted'
                        ? 'Restricted'
                        : 'Private'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="text-center text-gray-500 py-8">
                <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No recent activity</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {isOwner && (
                  <>
                    <Button className="w-full bg-[#0890A8] text-white">
                      Create Quiz
                    </Button>
                    <Button className="w-full" variant="outline">
                      Invite Members
                    </Button>
                  </>
                )}
                <Button className="w-full" variant="outline">
                  View All Quizzes
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div>
            {loadingQuizzes ? (
              <div className="flex justify-center py-8">
                <ContentLoader
                  message="Loading quizzes..."
                  size="sm"
                  variant="primary"
                />
              </div>
            ) : Array.isArray(quizzes) && quizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(quizzes as any[]).map((quiz: any) => (
                  <div
                    key={quiz._id}
                    className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-medium mb-2">{quiz.title}</h3>
                    {quiz.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {quiz.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{quiz.questions?.length || 0} questions</span>
                      <span>
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-[#444444] mb-2">
                  No quizzes yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {isOwner
                    ? 'Create your first quiz to get started'
                    : 'No quizzes have been added to this class yet'}
                </p>
                {isOwner && (
                  <Button className="bg-[#0890A8] text-white">
                    Create First Quiz
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            {classData.members && classData.members.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Class Members ({memberCount})
                    </h3>
                    {isOwner && (
                      <Button className="bg-[#0890A8] text-white">
                        Invite Members
                      </Button>
                    )}
                  </div>
                </div>
                <div className="divide-y">
                  {classData.members.map((member) => (
                    <div
                      key={member._id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0890A8] rounded-full flex items-center justify-center text-white font-medium">
                          {member.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium">
                            {member.user?.name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.user?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            member.accessLevel === 'owner'
                              ? 'bg-purple-100 text-purple-800'
                              : member.accessLevel === 'admin'
                                ? 'bg-red-100 text-red-800'
                                : member.accessLevel === 'collaborator'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {member.accessLevel}
                        </span>
                        {isOwner && member.accessLevel !== 'owner' && (
                          <Button variant="outline" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-[#444444] mb-2">
                  No members yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Invite people to join this class
                </p>
                {isOwner && (
                  <Button className="bg-[#0890A8] text-white">
                    Invite First Member
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
