import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const SYMBOL = "MSFT"; // Example: Microsoft stock

async function fetchStockData() {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${$}&interval=5min&apikey=${FBNT59OAZ8MMBNKL}`
    );
    const data = await response.json();

    if (data["Error Message"]) {
      throw new Error(data["Error Message"]);
    }

    const timeSeries = data["Time Series (5min)"];
    const chartData = Object.entries(timeSeries)
      .map(([time, values]) => ({
        time: time.split(" ")[1], // Extract only the time part
        price: parseFloat(values["4. close"]),
      }))
      .reverse()
      .slice(0, 20); // Get last 20 data points

    console.log("Fetched stock data:", chartData);
    return chartData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
}

fetchStockData();
