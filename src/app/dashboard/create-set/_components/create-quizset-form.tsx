'use client';

import { useState } from 'react';
import { ArrowLeft, Import, Settings } from 'lucide-react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

export default function CreateSetForm() {
  const { register, setValue, watch } = useFormContext();
  const [tagInput, setTagInput] = useState('');
  const tags = watch('tags') || [];

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagInput.trim()) {
        setValue('tags', [...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </Link>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 flex items-center gap-2"
          >
            <Import className="h-4 w-4" />
            Import
          </button>
          <button
            type="button"
            className="border border-gray-300 rounded-md p-2 text-sm font-medium text-gray-700"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2 text-sm font-medium"
          >
            Create Set
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter quiz set title. Eg: Bio Chapter 12"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            {...register('title', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter a description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            rows={3}
            {...register('description')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            type="text"
            placeholder="Enter tags, separate by comma"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 