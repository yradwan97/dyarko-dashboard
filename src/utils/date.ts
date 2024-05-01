import dayjs from "dayjs";

export const getTodayDate = (): Date => {
  return new Date(Date.now());
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  const displayedMonth = month < 10 ? `0${month}` : month;
  const displayedDay = day < 10 ? `0${day}` : day;
  return `${year}-${displayedMonth}-${displayedDay}`;
};

export const getTomorrowDate = (): Date => {
  return dayjs().add(1, "day").toDate();
};
