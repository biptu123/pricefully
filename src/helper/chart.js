import moment from "moment";

// Function to group data by year and calculate average price for each year
export const groupByYearAndCalculateAverage = (data) => {
  let averagePrices = [];

  const today = moment();
  const previous12Months = [];

  for (let i = 0; i < 12; i++) {
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
    const average = sum > 0 && length > 0 ? sum / length : null;
    averagePrices.push({
      label: item.label,
      price: average,
    });
  });

  averagePrices = averagePrices.reverse();
  if (!averagePrices[0].price) averagePrices[0].price = 0;
  for (let i = 1; i < averagePrices.length; i++) {
    if (!averagePrices[i].price)
      averagePrices[i].price = averagePrices[i - 1].price;
  }

  return averagePrices;
};

// Function to group data by month and calculate average price for each month
export const groupByMonthAndCalculateAverage = (data) => {
  let averagePrices = [];

  const today = moment();
  const previous30days = [];

  for (let i = 0; i <= 30; i++) {
    const label = today.clone().subtract(i, "days").format("YYYY-MM-DD");
    previous30days.push({ label, prices: [] });
  }

  data.forEach((item) => {
    const monthYear = moment(item.timestamp).format("YYYY-MM-DD");

    const monthObject = previous30days.find(
      (month) => month.label === monthYear
    );

    if (monthObject) {
      monthObject.prices.push(Number(item.price));
    }
  });

  previous30days.forEach((item) => {
    let length = 0;
    let sum = 0;
    item.prices.forEach((value) => {
      if (value !== 0) {
        length++;
        sum += value;
      }
    });
    const average = sum > 0 && length > 0 ? sum / length : null;
    averagePrices.push({
      label: moment(item.label).format("DD MMM"),
      price: average,
    });
  });

  averagePrices = averagePrices.reverse();
  if (!averagePrices[0].price) averagePrices[0].price = 0;
  for (let i = 1; i < averagePrices.length; i++) {
    if (!averagePrices[i].price)
      averagePrices[i].price = averagePrices[i - 1].price;
  }

  return averagePrices;
};

// Function to group data by week and calculate average price for each week
export const groupByWeekAndCalculateAverage = (data) => {
  let averagePrices = [];

  const today = moment();
  const previous7days = [];

  for (let i = 0; i < 7; i++) {
    const label = today.clone().subtract(i, "days").format("YYYY-MM-DD");
    previous7days.push({ label, prices: [] });
  }

  data.forEach((item) => {
    const monthYear = moment(item.timestamp).format("YYYY-MM-DD");

    const monthObject = previous7days.find(
      (month) => month.label === monthYear
    );

    if (monthObject) {
      monthObject.prices.push(Number(item.price));
    }
  });

  console.log(previous7days);
  previous7days.forEach((item) => {
    let length = 0;
    let sum = 0;
    item.prices.forEach((value) => {
      if (value !== 0 && !isNaN(value)) {
        length++;
        sum += value;
      }
    });
    const average = length > 0 ? sum / length : null;
    averagePrices.push({
      label: moment(item.label).format("ddd"),
      price: average,
    });
  });
  averagePrices = averagePrices.reverse();
  if (!averagePrices[0].price) averagePrices[0].price = 0;
  for (let i = 1; i < averagePrices.length; i++) {
    if (!averagePrices[i].price)
      averagePrices[i].price = averagePrices[i - 1].price;
  }

  return averagePrices;
};

export const groupBySixMonthsAndCalculateAverage = (data) => {
  const formattedData = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }));
  let averagePrices = [];

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
    const average = length > 0 ? sum / length : null;
    averagePrices.push({
      label: item.label,
      price: average,
    });
  });

  averagePrices = averagePrices.reverse();
  if (!averagePrices[0].price) averagePrices[0].price = 0;
  for (let i = 1; i < averagePrices.length; i++) {
    if (!averagePrices[i].price)
      averagePrices[i].price = averagePrices[i - 1].price;
  }

  return averagePrices;
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
