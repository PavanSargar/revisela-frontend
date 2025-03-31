import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateInputProps {
  label?: string;
  name?: string;
  className?: string;
  onChange?: (date: { month: string; day: string; year: string }) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  className,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState({
    month: "",
    day: "",
    year: "",
  });

  const months = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "May" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Aug" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    return {
      value: day < 10 ? `0${day}` : `${day}`,
      label: day < 10 ? `0${day}` : `${day}`,
    };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - i;
    return { value: `${year}`, label: `${year}` };
  });

  const handleChange = (field: "month" | "day" | "year", value: string) => {
    const newValues = {
      ...selectedValues,
      [field]: value,
    };

    setSelectedValues(newValues);

    if (onChange) {
      onChange({
        month: field === "month" ? value : selectedValues.month,
        day: field === "day" ? value : selectedValues.day,
        year: field === "year" ? value : selectedValues.year,
      });
    }
  };

  const selectWrapperClass = "relative w-full";
  const selectClass = cn(
    "appearance-none w-full px-3 py-2 border border-[#ACACAC] rounded-[10px] focus:outline-none focus:ring bg-white",
    "pr-10", // Add padding for the icon
    className
  );

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="block mb-[5px] text-[18px] text-[#444444]"
        >
          {label}
        </label>
      )}
      <div className="flex gap-3">
        <div className={selectWrapperClass}>
          <select
            className={cn(
              selectClass,
              selectedValues.month ? "text-black" : "text-[#ACACAC]"
            )}
            onChange={(e) => handleChange("month", e.target.value)}
            value={selectedValues.month}
          >
            <option value="" disabled>
              MMM
            </option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#ACACAC]">
            <ChevronDown size={18} />
          </div>
        </div>

        <div className={selectWrapperClass}>
          <select
            className={cn(
              selectClass,
              selectedValues.day ? "text-black" : "text-[#ACACAC]"
            )}
            onChange={(e) => handleChange("day", e.target.value)}
            value={selectedValues.day}
          >
            <option value="" disabled>
              DD
            </option>
            {days.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#ACACAC]">
            <ChevronDown size={18} />
          </div>
        </div>

        <div className={selectWrapperClass}>
          <select
            className={cn(
              selectClass,
              selectedValues.year ? "text-black" : "text-[#ACACAC]"
            )}
            onChange={(e) => handleChange("year", e.target.value)}
            value={selectedValues.year}
          >
            <option value="" disabled>
              YYYY
            </option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#ACACAC]">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
