import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CustomBtn from "../CustomBtn";
import { Icon, InlineIcon } from "@iconify/react";
import x24 from "@iconify/icons-octicon/x-24";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function CustomDropDown() {
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
      <Dropdown.Item href="#/action-1">
        Open issues and pull requests
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2">Your issues</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Your pull requests</Dropdown.Item>
      <Dropdown.Item href="#/action-3">
        Everything assigned to you
      </Dropdown.Item>
      <Dropdown.Item href="#/action-3">
        Everything mentioning to you
      </Dropdown.Item>
      <Dropdown.Item href="#/action-3">
        View advanced search syntax
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default CustomDropDown;
