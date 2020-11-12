const inputDataToUrl = (inputData) => {
  if (!inputData.length) return "api/issue";
  const searchRegex = /is\:(open|closed)|(milestone\:"([^"]*)")|(milestone\:([^\s]*))|(label\:"([^"]*)")|(label\:([^\s]*))|(author\:([^\s]*))|(commentor\:([^\s]*)|(assignee\:([^\s]*)))/g;
  const parsedData = inputData.match(searchRegex);
  if (!parsedData) return;

  return (
    "api/issue?" +
    parsedData
      .reduce((acc, e) => {
        if (e === "is:closed") return acc + "isOpened=0&";
        if (e === "is:open") return acc + "isOpened=1&";
        const seperatedStr = e.split(":");
        const tag = seperatedStr[0];
        const completedStr = tag + "=" + seperatedStr.slice(1).join(":");
        return acc + completedStr.replace(/"/g, "").replace(/\s/g, "+") + "&";
      }, "")
      .slice(0, -1)
  );
};

export default inputDataToUrl;
