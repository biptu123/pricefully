import moment from "moment";

// Function to group data by year and calculate average price for each year
export const groupByYearAndCalculateAverage = (data) => {
  const averagePrices = [];

  const today = moment();
  const previous12Months = [];

  for (let i = 0; i <= 12; i++) {
    const label = today.clone().subtract(i, "months").format("MMM YY");
    previous12Months.push({ label, prices: [] });
  }

  data.forEach((item) => {
    const monthYear = moment(item.timestamp).format("MMM YY");

    const monthObject = previous12Months.find(
      (month) => month.label === monthYear
    );

    if (monthObject) {
      monthObject.prices.push(Number(item.price));
    }
  });

  previous12Months.forEach((item) => {
    let length = 0;
    let sum = 0;
    item.prices.forEach((value) => {
      if (value !== 0) {
        length++;
        sum += value;
      }
    });
    const average = item.prices.length > 0 ? sum / length : null;
    averagePrices.push({
      label: item.label,
      price: average,
    });
  });

  return averagePrices.reverse();
};

// Function to group data by month and calculate average price for each month
export const groupByMonthAndCalculateAverage = (data) => {
  const averagePrices = [];

  const today = moment();
  const previous12Months = [];

  for (let i = 0; i <= 30; i++) {
    const label = today.clone().subtract(i, "days").format("DD-MM-YY");
    previous12Months.push({ label, prices: [] });
  }

  data.forEach((item) => {
    const monthYear = moment(item.timestamp).format("DD-MM-YY");

    const monthObject = previous12Months.find(
      (month) => month.label === monthYear
    );

    if (monthObject) {
      monthObject.prices.push(Number(item.price));
    }
  });

  previous12Months.forEach((item) => {
    let length = 0;
    let sum = 0;
    item.prices.forEach((value) => {
      if (value !== 0) {
        length++;
        sum += value;
      }
    });
    const average = item.prices.length > 0 ? sum / length : null;
    averagePrices.push({
      label: item.label,
      price: average,
    });
  });

  return averagePrices.reverse();
};

// Function to group data by week and calculate average price for each week
export const groupByWeekAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const averagePrices = [];

  return averagePrices;
};

// Function to group data by day and calculate average price for each day
export const groupByDayAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));

  const averagePrices = [];

  return averagePrices;
};

export const groupBySixMonthsAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));
  const averagePrices = [];

  const today = moment();
  const previous6Months = [];

  for (let i = 0; i <= 6; i++) {
    const label = today.clone().subtract(i, "months").format("MMM YY");
    previous6Months.push({ label, prices: [] });
  }

  data.forEach((item) => {
    const monthYear = moment(item.timestamp).format("MMM YY");

    const monthObject = previous6Months.find(
      (month) => month.label === monthYear
    );

    if (monthObject) {
      monthObject.prices.push(Number(item.price));
    }
  });

  previous6Months.forEach((item) => {
    let length = 0;
    let sum = 0;
    item.prices.forEach((value) => {
      if (value !== 0) {
        length++;
        sum += value;
      }
    });
    const average = item.prices.length > 0 ? sum / length : null;
    averagePrices.push({
      label: item.label,
      price: average,
    });
  });

  return averagePrices.reverse();
};

export const getGroupByIntervel = (data, type) => {
  // console.log(data, type);
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
