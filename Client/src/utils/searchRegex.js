const inputDataToUrl = (inputData) => {
  if (!inputData.length) return "api/issue";
  const searchRegex = /(is\:(open|closed))|(milestone\:([^\s]*))|(label\:([^\s]*))|(author\:([^\s]*))|(commentor\:([^\s]*)|(assignee\:([^\s]*)))/g;
  const parsedData = inputData.match(searchRegex);
  if (!parsedData) return;
  return (
    "api/issue?" +
    parsedData
      .reduce((acc, e) => {
        return (
          acc +
          e
            .replace("is", "isOpened")
            .replace(":", "=")
            .replace("closed", 0)
            .replace("open", 1) +
          "&"
        );
      }, "")
      .slice(0, -1)
  );
};

export default inputDataToUrl;
