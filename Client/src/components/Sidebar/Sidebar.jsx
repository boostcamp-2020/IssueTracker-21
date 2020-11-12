import React from "react";
import AsigneeSideItem from "../AsigneeSideItem";
import LabelSideItem from "../LabelSideItem";
import MilestoneSideItem from "../MilestoneSideItem";

export const SidebarContext = React.createContext();
function Sidebar({
  assigneeList,
  curAssigneeList,
  labelList,
  curLabelList,
  curlabelListHandler,
  curMilestone,
  curMilestoneListHandler,
  milestone,
  progress,
  assigneeListHandler,
  curAssigneeListHandler,
  labelListHandler,
  milestoneListHandler,
  assignMeHandler,
}) {
  return (
    <SidebarContext.Provider
      value={{
        assigneeList,
        labelList,
        milestone,
        progress,
        assigneeListHandler,
        labelListHandler,
        milestoneListHandler,
        curAssigneeList,
        curAssigneeListHandler,
        curLabelList,
        curMilestone,
        curlabelListHandler,
        curMilestoneListHandler,
        assignMeHandler,
      }}
    >
      <div>
        <AsigneeSideItem />
        <hr />
        <LabelSideItem />
        <hr />
        <MilestoneSideItem />
      </div>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
