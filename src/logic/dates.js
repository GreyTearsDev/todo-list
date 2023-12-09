import { format } from "date-fns";

const setTaskDate = (dueDate) => {
  const date = format(new Date(dueDate), yyyy - MM - dd);
  return date;
};

export { setTaskDate };
