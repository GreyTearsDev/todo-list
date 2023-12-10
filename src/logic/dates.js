import { format, differenceInDays } from "date-fns";

const dateManager = () => {
  const creationDate = format(new Date(), "MMMM d, yyyy");
  let dueDate = "";

  const setDueDate = (date) => {
    dueDate = format(date, "MMMM d, yyyy");
  };

  const getDueDate = () => {
    return dueDate;
  };

  const getCreationDate = () => {
    return creationDate;
  };

  const getTimeDifference = () => {
    return differenceInDays(dueDate, creationDate);
  };

  return { getDueDate, getCreationDate, getTimeDifference, setDueDate };
};

export { dateManager };
