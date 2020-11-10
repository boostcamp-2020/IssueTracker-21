import React from "react";
import AsigneeSideItem from "../AsigneeSideItem";
import LabelSideItem from "../LabelSideItem";
import MilestoneSideItem from "../MilestoneSideItem";

function Sidebar() {
  return (
    <div>
      <AsigneeSideItem />
      <hr />
      <LabelSideItem />
      <hr />
      <MilestoneSideItem />
    </div>
  );
}

export default Sidebar;
