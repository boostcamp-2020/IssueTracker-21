import { isEqual } from "./toggle";

export const checkExistElement = (array, compareArray) => {
  return array.filter((element) => {
    for (let i = 0; i < compareArray.length; i++) {
      if (isEqual(element, compareArray[i])) return element;
    }
  });
};

export const checkNonExistElement = (array, compareArray) => {
  return array.filter((element) => {
    for (let i = 0; i < compareArray.length; i++) {
      if (!isEqual(element, compareArray[i])) return element;
    }
  });
};
