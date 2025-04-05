"use client";
import React, { useState } from "react";
import { Pen, Check, X } from "lucide-react";
import { Input } from "@/components/ui";
import { DateInput } from "@/components/ui/DateInput";

interface EditProfileDetailProps {
  label: string;
  value: string;
  fieldType?: "text" | "email" | "date";
  accentLabel?: boolean;
  onSave: (newValue: string) => void;
}

const EditProfileDetail: React.FC<EditProfileDetailProps> = ({
  label,
  value,
  fieldType = "text",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [dateValues, setDateValues] = useState<{
    month: string;
    day: string;
    year: string;
  }>(() => {
    // If the field is a date and has a value like "01-Jan-2001", parse it
    if (fieldType === "date" && value) {
      try {
        const dateParts = value.split("-");
        if (dateParts.length === 3) {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthIndex = months.findIndex((m) => m === dateParts[1]) + 1;
          return {
            day: dateParts[0],
            month: monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`,
            year: dateParts[2],
          };
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
    return { month: "", day: "", year: "" };
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value); // Reset to original value
  };

  const handleSave = () => {
    if (fieldType === "date") {
      // Convert date values to the format "DD-MMM-YYYY"
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthStr = months[parseInt(dateValues.month) - 1] || "";
      const formattedDate = `${dateValues.day}-${monthStr}-${dateValues.year}`;
      onSave(formattedDate);
    } else {
      onSave(editValue);
    }
    setIsEditing(false);
  };

  const handleDateChange = (values: {
    month: string;
    day: string;
    year: string;
  }) => {
    setDateValues(values);
  };

  return (
    <div
      className={`p-4 rounded-md flex justify-between items-center ${
        isHovered || isEditing ? "bg-gray-100" : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <div className="w-full">
          {fieldType === "date" ? (
            <DateInput
              label={label}
              onChange={handleDateChange}
              value={dateValues}
            />
          ) : (
            <Input
              label={label}
              type={fieldType}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          )}
          <div className="flex justify-end mt-3 gap-2">
            <button
              onClick={handleCancel}
              className="text-red-500 flex items-center"
            >
              <X size={18} />
              <span className="ml-1 text-sm">Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="text-green-500 flex items-center"
            >
              <Check size={18} />
              <span className="ml-1 text-sm">Save</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p
              className={`${
                Boolean(isHovered || isEditing)
                  ? "text-[#0890A8]"
                  : "text-secondary-black"
              } text-sm`}
            >
              {label}
            </p>
            <p className="text-secondary-black">{value}</p>
          </div>
          <button
            className="text-[#0890A8] flex items-center"
            onClick={handleEdit}
          >
            <Pen size={18} />
            <span className="ml-1 text-sm">Edit</span>
          </button>
        </>
      )}
    </div>
  );
};

export default EditProfileDetail;
