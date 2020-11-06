import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CustomBtn from "../CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import x24 from "@iconify/icons-octicon/x-24";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { LandingPageContext } from "../../views/LandingPage";

function CustomDropDown(props) {
  const { inputOnClickHandler } = useContext(LandingPageContext);

  return (
    <DropdownButton
      className="dropdown__btn"
      id="dropdown-basic-button"
      title="Filters"
    >
      <Dropdown.Header className="dropdown__header">
        Filter issues
        <CustomBtn bgColor="white" border="none  ">
          <Icon icon={x24} />
        </CustomBtn>
      </Dropdown.Header>
      <Dropdown.Item id="Opned" onClick={inputOnClickHandler}>
        Open issues and pull requests
      </Dropdown.Item>
      <Dropdown.Item id="IssueMe" onClick={inputOnClickHandler}>
        Your issues
      </Dropdown.Item>
      <Dropdown.Item id="PRMe" onClick={inputOnClickHandler}>
        Your pull requests
      </Dropdown.Item>
      <Dropdown.Item id="AssignedMe" onClick={inputOnClickHandler}>
        Everything assigned to you
      </Dropdown.Item>
      <Dropdown.Item id="MentionMe" onClick={inputOnClickHandler}>
        Everything mentioning to you
      </Dropdown.Item>
      <Dropdown.Item href="https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-issues-and-pull-requests">
        <b> 📦 View advanced search syntax</b>
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default CustomDropDown;
