const isEqual = function (ob1, ob2) {
  // 인자값의 Type이 object가 아닐경우 false를 리턴한다.
  if (typeof ob1 !== "object" || typeof ob2 !== "object") return false;
  // Type을 String으로 변환한다.
  var arr1 = JSON.stringify(ob1);
  var arr2 = JSON.stringify(ob2);

  return arr1 === arr2;
};

export const toggleArray = (array, data) => {
  const newArray = array.filter((e) => {
    return !isEqual(e, data);
  });
  if (newArray.length === array.length) return [...newArray, data];
  return newArray;
};

export const toggleObject = (ob1, ob2) => {
  if (isEqual(ob1, ob2))  return null;
  return ob2;
}

