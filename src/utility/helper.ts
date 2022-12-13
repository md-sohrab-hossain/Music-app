import moment from "moment";

export const formatDate = (date: Date | string) => {
  return moment(date).format("MM/DD/YYYY h:mm:ss a");
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.round(time - minutes * 60 || 0);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
