import { createList } from "../storage/storage";
import { addDays } from "date-fns";

export default createTask = () => {
  let title = "";
  let priority = "";
  let dueDate = "";
  let checkList = createList();

  const setTitle = (projTitle) => {
    title = projTitle;
  };

  const getTitle = () => {
    return title;
  };

  const setPriority = (projPriority) => {
    priority = projPriority;
  };

  const getPriority = () => {
    return priority;
  };

  const setDueDate = (projDate) => {
    dueDate = projDate;
  };

  const getDueDate = () => {
    return dueDate;
  };

  const addCheckListItem = (item) => {
    checkList.append(item);
  };

  const removeCheckListItem = (item) => {
    checkList.remove(item);
  };

  const getCheckList = () => {
    return checkList;
  };

  return {
    setTitle,
    getPriority,
    setDueDate,
    setPriority,
    getTitle,
    getPriority,
    getDueDate,
    addCheckListItem,
    removeCheckListItem,
    getCheckList,
  };
};
