import React from "react";
import styled from "styled-components";
import { Icon, InlineIcon } from "@iconify/react";
import tagIcon from "@iconify/icons-octicon/tag";
import CustomBtn from "../../components/CustomBtn";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import Milestone from "../../components/MilestoneList";

function MilestonePage(props) {
  return (
    <PageStyle>
      <TopNavStyle id="topNav">
        <div className="button__section">
          <BtnAtagStyle href="/labels">
            <CustomBtn
              color="black"
              bgColor="white"
              width="100%"
              height="30px"
              border="1px solid #e1e4e8"
              borderRad="6px 0 0 6px"
              padding="5px 13px"
            >
              <Icon width="18" height="18" icon={tagIcon} />
              &nbsp;Labels
            </CustomBtn>
          </BtnAtagStyle>

          <BtnAtagStyle href="/milestone">
            <CustomBtn
              color="white"
              bgColor="#0E66D6"
              width="100%"
              height="30px"
              border="1px solid #e1e4e8"
              borderRad="0 6px 6px 0"
              padding="5px 13px"
            >
              <Icon width="18" height="18" icon={milestone24} />
              &nbsp;Milestones
            </CustomBtn>
          </BtnAtagStyle>
        </div>

        <div id="newMilestoneBtnArea">
          <CustomBtn
            color="white"
            bgColor="#2ea44f"
            width="110px"
            borderRad="6px"
            height="30px"
            border="0"
          >
            New milestone
          </CustomBtn>
        </div>
      </TopNavStyle>
      <ContentsAreaStyle id="contentsArea">
        <Milestone {...props} />
      </ContentsAreaStyle>
    </PageStyle>
  );
}

const PageStyle = styled.div`
  width: 100%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopNavStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 60px;
`;

const BtnAtagStyle = styled.a`
  width: 100%;
`;

const ContentsAreaStyle = styled.div`
  width: 100%;
`;

export default MilestonePage;
