import React from "react";
import { getMonthName } from "../utils/helpers";

const DatePicker = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // Last 5 years

  const months = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    name: getMonthName(i + 1),
  }));

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <label
          htmlFor="year-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="month-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Month
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
        >
          {months.map((month) => (
            <option key={month.number} value={month.number}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DatePicker;
