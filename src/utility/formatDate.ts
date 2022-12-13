import moment from "moment";

export const formatDate = (date: Date | string) => {
  return moment(date).format("MM/DD/YYYY h:mm:ss a");
};
