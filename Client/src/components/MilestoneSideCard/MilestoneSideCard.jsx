import React, { useContext } from "react";
import Progressbar from "../Progressbar";
import { NewIssuePageContext } from "../../views/NewIssuePage";

function MilestoneSideCard({ title }) {
  const { progress } = useContext(NewIssuePageContext);

  return (
    <div>
      <Progressbar completed={progress} />
      <span>{title}</span>
    </div>
  );
}

export default MilestoneSideCard;
