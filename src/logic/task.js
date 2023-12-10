import { createList } from "../storage/storage";
import { dateManager } from "./dates";

const createTask = () => {
  let title = "";
  let priority = "";
  let description = "";
  let done = false;
  const taskDates = dateManager();

  const getTaskStatus = () => {
    return done;
  };

  const switchTaskStatus = () => {
    done = !done;
  };

  const setTitle = (projTitle) => {
    title = projTitle;
  };

  const getTitle = () => {
    return title;
  };

  const getDescription = () => {
    return description;
  };

  const setDescription = (desc) => {
    description = desc;
  };

  const setPriority = (projPriority) => {
    priority = projPriority;
  };

  const getPriority = () => {
    return priority;
  };

  const addCheckListItem = (item) => {
    checkList.append(item);
  };

  const removeCheckListItem = (item) => {
    checkList.remove(item);
  };

  return {
    setTitle,
    getPriority,
    setPriority,
    setDescription,
    getDescription,
    getTitle,
    getPriority,
    addCheckListItem,
    removeCheckListItem,
    getTaskStatus,
    switchTaskStatus,
    taskDates,
  };
};

export { createTask };
