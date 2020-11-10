import React from "react";
import Progressbar from "../Progressbar";

function MilestoneSideCard({ title }) {
  return (
    <div>
      <span>{title}</span>
      <Progressbar completed={50} />
    </div>
  );
}

export default MilestoneSideCard;
