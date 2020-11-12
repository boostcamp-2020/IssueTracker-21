import React, { useEffect, useState, useRef, useContext } from "react";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { LandingPageContext } from "../../views/LandingPage";

function DropDownStatus(props) {
  const { Issues, issueHandler } = useContext(LandingPageContext);
  const issueIdArr = props.issueIdArr;

  const renderIssues = () => {
    axios.get("/api/issue").then((response) => {
      if (response.data.success) {
        issueHandler(response.data.issues);
      } else {
        alert("Failed to get issues");
      }
    });
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose(e);
    }
  };

  const close = (e) => {
    if (props.onClose) {
      props.onClose(e);
    }
  };

  const openIssueHandler = (e) => {
    axios
      .put("/api/issue/status", { issueId: issueIdArr, newStatus: true })
      .then((response) => {
        if (response.data.success) {
          renderIssues();
        } else {
          alert("Failed to update status of issues");
        }
      });
    close(e);
  };

  const closeIssueHandler = (e) => {
    axios
      .put("/api/issue/status", { issueId: issueIdArr, newStatus: false })
      .then((response) => {
        if (response.data.success) {
          renderIssues();
        } else {
          alert("Failed to update status of issues");
        }
      });
    close(e);
  };

  return (
    <DropDownContainter visible={props.visible}>
      <DropDownBarContainter>Actions</DropDownBarContainter>
      <DropDownListContainter>
        <div className="dropDownList">
          <div className="dropDownCardContainter">
            <DropDownStatusCard onClick={openIssueHandler}>
              <div className="dropDownMilestoneName">Open</div>
            </DropDownStatusCard>
            <DropDownStatusCard onClick={closeIssueHandler}>
              <div className="dropDownMilestoneName">Closed</div>
            </DropDownStatusCard>
          </div>
        </div>
      </DropDownListContainter>
    </DropDownContainter>
  );
}

const DropDownStatusCard = styled.div`
  border-top: 1px solid rgb(225, 228, 232);
  background-color: #ffffff;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #f6f8fa;
  }
`;

let DropDownContainter = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  top: 250px;
  width: 200px;
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
  font-size: 13px;
  display: flex;
  flex-flow: column;
  box-shadow: 0px 0px 5px rgb(225, 228, 232);
  z-index: 3;
`;

const DropDownBarContainter = styled.div`
  border-radius: 6px 6px 0 0;
  background-color: #fafbfc;
  padding: 7px;
  font-weight: 700;
`;

const DropDownListContainter = styled.div`
  cursor: pointer;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
`;

export default DropDownStatus;
