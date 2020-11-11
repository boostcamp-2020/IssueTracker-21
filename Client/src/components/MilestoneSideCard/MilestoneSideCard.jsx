import React, { useContext } from "react";
import Progressbar from "../Progressbar";
import { SidebarContext } from "../Sidebar";

function MilestoneSideCard({ title }) {
  const { progress } = useContext(SidebarContext);

  return (
    <div>
      <Progressbar completed={progress} />
      <span>{title}</span>
    </div>
  );
}

export default MilestoneSideCard;
