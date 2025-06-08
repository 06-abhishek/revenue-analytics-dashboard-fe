"use client";

import React, { useState } from "react";
import Head from "next/head";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import ProductSalesTable from "../components/ProductSalesTable";
import DatePicker from "../components/DatePicker";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRevenueData } from "../hooks/useRevenueData";
import { getMonthName } from "../utils/helpers";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { productSalesBreakdown, loading, error } = useRevenueData(
    selectedYear,
    selectedMonth
  );

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Head>
        <title>Revenue Dashboard</title>
        <meta
          name="description"
          content="Visualize monthly revenue data product-wise."
        />
      </Head>

      <main className="container mx-auto bg-white rounded-lg shadow-xl p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-8">
          Product Revenue Dashboard
        </h1>

        <DatePicker
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />

        {loading && <LoadingSpinner />}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text mb-6 border-b pb-2">
                Monthly Product Revenue Distribution (
                {getMonthName(selectedMonth)} {selectedYear})
              </h2>
              <div className="flex justify-center items-center h-full">
                <MonthlyRevenueChart data={productSalesBreakdown} />
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text mb-6 border-b pb-2">
                Product Sales Breakdown ({getMonthName(selectedMonth)}{" "}
                {selectedYear})
              </h2>
              <ProductSalesTable
                data={productSalesBreakdown}
                title="Product Sales Breakdown"
              />
            </section>

            {/* You can add more sections here for detailed revenue or monthly revenue tables if needed */}
          </>
        )}
      </main>
    </div>
  );
}
