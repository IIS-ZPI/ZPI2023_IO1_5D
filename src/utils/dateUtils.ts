export const getDefaultStartingDate = (): string => {
  const today = new Date();
  const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

  const year = lastMonth.getFullYear();
  const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
  const day = String(lastMonth.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateEndDate = (startingDate: string, timePeriod: string): string => {
  const startDate = new Date(startingDate);
  let result: Date;

  switch (timePeriod) {
    case "7 days":
      result = new Date(startDate.setDate(startDate.getDate() + 7));
      break;
    case "14 days":
      result = new Date(startDate.setDate(startDate.getDate() + 14));
      break;
    case "30 days":
    case "Switch period":
      result = new Date(startDate.setMonth(startDate.getMonth() + 1));
      break;
    case "90 days":
      result = new Date(startDate.setMonth(startDate.getMonth() + 3));
      break;
    case "180 days":
      result = new Date(startDate.setMonth(startDate.getMonth() + 6));
      break;
    case "365 days":
      result = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
      break;
    default:
      throw new Error("Invalid time period");
  }

  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const daysDifference = (startingDate: string, days: number): boolean => {
  const today = new Date();
  const startDate = new Date(startingDate);
  const differenceInTime = today.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays >= days;
};

export const getMaxDate = (): string => {
  const today = new Date();
  const maxDate = new Date(today.setDate(today.getDate() - 7));
  const year = maxDate.getFullYear();
  const month = String(maxDate.getMonth() + 1).padStart(2, "0");
  const day = String(maxDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
