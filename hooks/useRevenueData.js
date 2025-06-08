import { useState, useEffect, useCallback } from "react";
import {
  fetchMonthlyRevenue,
  fetchDetailedRevenue,
  fetchProductWiseRevenue,
  fetchProductSalesBreakdown,
} from "../lib/api";

export const useRevenueData = (year, month) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [detailedRevenue, setDetailedRevenue] = useState([]);
  const [productWiseRevenue, setProductWiseRevenue] = useState([]);
  const [productSalesBreakdown, setProductSalesBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [monthlyRes, detailedRes, productWiseRes, salesBreakdownRes] =
        await Promise.all([
          fetchMonthlyRevenue(year),
          fetchDetailedRevenue(year, month),
          fetchProductWiseRevenue(year, month),
          fetchProductSalesBreakdown(year, month),
        ]);

      setMonthlyRevenue(monthlyRes);
      setDetailedRevenue(detailedRes);
      setProductWiseRevenue(productWiseRes);
      setProductSalesBreakdown(salesBreakdownRes);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    if (year && month) {
      fetchData();
    }
  }, [year, month, fetchData]);

  return {
    monthlyRevenue,
    detailedRevenue,
    productWiseRevenue,
    productSalesBreakdown,
    loading,
    error,
    refetch: fetchData,
  };
};
