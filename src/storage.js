const createList = function () {
  let listSize = 0;
  let position = 0;
  let dataStore = [];

  const append = (element) => {
    dataStore[listSize++] = element;
  };

  const find = (element) => {
    for (let i = 0; i < dataStore.length; ++i) {
      if (dataStore[i] == element) return i;
    }
    return -1;
  };

  const findStrict = (element) => {
    for (let i = 0; i < dataStore.length; ++i) {
      if (dataStore[i] === element) return i;
    }
    return -1;
  };

  const remove = (element) => {
    let foundAt = this.find(element);
    if (foundAt > -1) {
      dataStore.splice(foundAt, 1);
      --listSize;
      return true;
    }
    return false;
  };

  const removeStrict = (element) => {
    let foundAt = this.findStrict(element);
    if (foundAt > -1) {
      dataStore.splice(foundAt, 1);
      --listSize;
      return true;
    }
    return false;
  };

  const length = () => {
    return listSize;
  };

  const toString = () => {
    return dataStore;
  };

  const insert = (element, after) => {
    const insertPosition = this.find(after);

    if (insertPosition > -1) {
      dataStore.splice(insertPosition + 1, 0, element);
      ++listSize;
      return true;
    }
    return false;
  };

  const clear = () => {
    dataStore = [];
    listSize = position = 0;
  };

  const contains = (element) => {
    for (let i = 0; i < dataStore.length; ++i) {
      if (dataStore[i] == element) return true;
    }
    return false;
  };

  const front = () => {
    position = 0;
  };

  const end = () => {
    position = listSize - 1;
  };

  const prev = () => {
    if (position > 0) {
      --position;
    }
  };

  const next = () => {
    if (position < listSize - 1) {
      position++;
    }
  };

  const currPos = () => {
    return position;
  };

  const moveTo = (newPos) => {
    position = newPos;
  };

  const getElement = () => {
    return dataStore[position];
  };

  return {
    append,
    find,
    findStrict,
    remove,
    removeStrict,
    length,
    toString,
    insert,
    clear,
    contains,
    front,
    end,
    prev,
    next,
    currPos,
    moveTo,
    getElement,
  };
};

let projects = createList();

export { createList, projects };
