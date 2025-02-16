import prisma from '../utils/prisma.js';

export const getProgressData = async (userId, startDate, endDate) => {
  try {
    return await prisma.progressLog.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endDate },
        deleted: false
      },
      orderBy: { date: 'asc' }
    });
  } catch (error) {
    throw new Error(`Failed to get progress data: ${error.message}`);
  }
};


export const getChartData = async (userId, metric, period) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    
    // Set start date based on period
    if (period === 'week') {
      startDate.setDate(endDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(endDate.getMonth() - 1);
    } else {
      throw new Error('Invalid period specified');
    }

    // Get all logs between start and end date
    const progressLogs = await prisma.progressLog.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        },
        deleted: false
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Process data based on metric type
    if (metric === 'weight') {
      return processWeightData(progressLogs, period);
    } else if (metric === 'calories') {
      return processCalorieData(progressLogs, period);
    } else {
      throw new Error('Invalid metric specified');
    }
  } catch (error) {
    throw new Error(`Failed to get chart data: ${error.message}`);
  }
};

const processWeightData = (logs, period) => {
  // Group weight data by date
  const weightData = logs.map(log => ({
    date: formatDate(log.date, period),
    value: log.weight
  }));

  // Fill in missing dates with null values
  return fillMissingDates(weightData, period);
};

const processCalorieData = (logs, period) => {
  // Calculate net calories (consumed - burned) for each day
  const calorieData = logs.map(log => ({
    date: formatDate(log.date, period),
    value: log.caloriesConsumed - log.caloriesBurned
  }));

  // Fill in missing dates with null values
  return fillMissingDates(calorieData, period);
};

const formatDate = (date, period) => {
  const d = new Date(date);
  if (period === 'week') {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const fillMissingDates = (data, period) => {
  const filledData = [];
  const startDate = new Date(data[0]?.date || new Date());
  const endDate = new Date();
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const formattedDate = formatDate(currentDate, period);
    const existingData = data.find(d => d.date === formattedDate);
    
    filledData.push({
      date: formattedDate,
      value: existingData ? existingData.value : null
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledData;
};