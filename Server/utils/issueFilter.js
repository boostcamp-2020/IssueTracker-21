exports.issueFilter = (condition, arr) => {
  console.log(arr[0]);
  return condition === undefined
    ? arr
    : arr.filter((e) => e[`"${condition}"`] == condition);
};

exports.issueFilterUsingSome = (condition, arr, key, attr) => {
  return condition === undefined
    ? arr
    : arr.filter((e) =>
        e[key].map((u) => u[attr]).some((i) => i === condition)
      );
};

exports.issueFilterUsingIncludes = (condition, arr, key, attr) => {
  return condition === undefined
    ? arr
    : arr.filter((e) =>
        e[key].map((l) => l[attr].toString()).includes(...condition)
      );
};
