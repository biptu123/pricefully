// dataUtils.js

// Function to group data by year and calculate average price for each year
export const groupByYearAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const groupedData = formattedData.reduce((acc, item) => {
    const year = item.timestamp.getFullYear();

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});

  const averagePrices = [];
  for (const year in groupedData) {
    const prices = groupedData[year].map((item) => parseFloat(item.price));
    const averagePrice =
      prices.reduce((total, price) => total + price, 0) / prices.length;
    averagePrices.push({
      label: year,
      price: averagePrice.toFixed(2), // Round to 2 decimal places
    });
  }

  return averagePrices;
};

// Function to group data by month and calculate average price for each month
export const groupByMonthAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const groupedData = formattedData.reduce((acc, item) => {
    const monthYear = item.timestamp.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(item);
    return acc;
  }, {});

  const averagePrices = [];
  for (const monthYear in groupedData) {
    const prices = groupedData[monthYear].map((item) => parseFloat(item.price));
    const averagePrice =
      prices.reduce((total, price) => total + price, 0) / prices.length;
    averagePrices.push({
      label: monthYear,
      price: averagePrice.toFixed(2),
    });
  }

  return averagePrices;
};

// Function to group data by week and calculate average price for each week
export const groupByWeekAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const groupedData = formattedData.reduce((acc, item) => {
    const year = item.timestamp.getFullYear();
    const month = item.timestamp.getMonth();
    const week = getWeekNumber(item.timestamp);

    const groupKey = `${year}-${month}-${week}`;

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  const averagePrices = [];
  for (const groupKey in groupedData) {
    const prices = groupedData[groupKey].map((item) => parseFloat(item.price));
    const averagePrice =
      prices.reduce((total, price) => total + price, 0) / prices.length;
    const [year, month, week] = groupKey.split("-");
    const shortMonthName = getMonthName(month).slice(0, 3); // Get the first three letters of the month name
    const shortYear = year.slice(-2); // Extract the last two digits of the year
    const label = `Week ${week} ${shortMonthName}, '${shortYear}`;
    averagePrices.push({
      label,
      price: averagePrice.toFixed(2), // Round to 2 decimal places
    });
  }

  return averagePrices;
};
// Helper function to get the week number of a date
const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Helper function to get the month name from its index
const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
// Function to group data by day and calculate average price for each day
// Function to group data by day and calculate average price for each day
// Function to group data by day and calculate average price for each day
export const groupByDayAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const groupedData = formattedData.reduce((acc, item) => {
    const date = item.timestamp.toDateString();

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const averagePrices = [];
  for (const date in groupedData) {
    const prices = groupedData[date].map((item) => parseFloat(item.price));
    const averagePrice =
      prices.reduce((total, price) => total + price, 0) / prices.length;
    averagePrices.push({
      label: date,
      price: averagePrice.toFixed(2), // Round to 2 decimal places
    });
  }

  return averagePrices;
};

export const groupBySixMonthsAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const groupedData = formattedData.reduce((acc, item) => {
    const monthYear = item.timestamp.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    const month = item.timestamp.getMonth() + 1; // January is 0, so add 1
    const sixMonthPeriod = Math.ceil(month / 6);
    const groupKey = `${sixMonthPeriod}-${item.timestamp.getFullYear()}`;

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  const averagePrices = [];
  for (const groupKey in groupedData) {
    const prices = groupedData[groupKey].map((item) => parseFloat(item.price));
    const averagePrice =
      prices.reduce((total, price) => total + price, 0) / prices.length;
    const [sixMonthPeriod, year] = groupKey.split("-");
    const shortYear = year.slice(-2); // Extract the last two digits of the year
    const label =
      sixMonthPeriod == 1
        ? `First Semester '${shortYear}`
        : `Second Semester '${shortYear}`;
    averagePrices.push({
      label,
      price: averagePrice.toFixed(2), // Round to 2 decimal places
    });
  }

  return averagePrices;
};

export const getGroupByIntervel = (data, type) => {
  console.log(data, type);
  switch (type) {
    case "year":
      return groupByYearAndCalculateAverage(data);
    case "month":
      return groupByMonthAndCalculateAverage(data);
    case "week":
      return groupByWeekAndCalculateAverage(data);
    case "day":
      return groupByDayAndCalculateAverage(data);
    case "sixMonth":
      return groupBySixMonthsAndCalculateAverage(data);
    default:
      return data.map((data) => {
        const timestamp = new Date(data.timestamp);
        const label = `${timestamp.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} ${timestamp.getHours()}:00`;
        return {
          label,
          price: parseFloat(data.price),
        };
      });
  }
};
