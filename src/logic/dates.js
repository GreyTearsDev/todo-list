import { format } from "date-fns";

const setTaskDate = (year, month, day) => {
  const date = format(new Date(year, month, day), yyyy - MM - dd);
  return date;
};

export { setTaskDate };
