import React from "react";

function Progressbar(props) {
  const { completed } = props;

  const containerStyles = {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#28a745",
    borderRadius: "inherit",
  };
  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
}

export default Progressbar;
