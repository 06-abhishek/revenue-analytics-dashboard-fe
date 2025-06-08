import axios from "axios";

const API_BASE_URL = "https://revenue-analytics-dashboard-be.onrender.com/api/revenue";

export const fetchMonthlyRevenue = async (year) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/monthly/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    throw error;
  }
};

export const fetchDetailedRevenue = async (year, month) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/details/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed revenue:", error);
    throw error;
  }
};

export const fetchProductWiseRevenue = async (year, month) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/product-wise/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product-wise revenue:", error);
    throw error;
  }
};

export const fetchProductSalesBreakdown = async (year, month) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/sales-breakdown/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product sales breakdown:", error);
    throw error;
  }
};
