import React, { useState } from "react";
import axios from "axios";

import NewMilestoneHeader from "../../components/NewMilestoneHeader";
import NewMilestoneBtn from "../../components/NewMilestoneBtn";
import MilestoneEditor from "../../components/MilestoneEditor";

import styled from "styled-components";

const MilestoneAddArea = styled.div`
  padding: 1% 5%;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function MilestoneAddPage(props) {
  const [title, setTitle] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [isDateForm, setIsDateForm] = useState(true);

  const titleHandler = (value) => {
    setTitle(value);
  };

  const dueDateHandler = (value) => {
    setDueDate(value);
  };

  const descriptionHandler = (value) => {
    setDescription(value);
  };

  const dateFormHandler = (value) => {
    setIsDateForm(value);
  };

  const postNewMilestone = () => {
    if (title == null || title == "") {
      alert("Title을 입력하세요");
      return;
    }
    if (!isDateForm) {
      alert("날짜의 형식이 맞지 않습니다");
      return;
    }
    let data = {
      title: title,
      dueDate: dueDate,
      description: description,
    };
    axios
      .post("api/milestone", data, {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        if (response.data.success) {
          props.history.push("/milestone");
        } else {
          console.log(response);
        }
      });
  };

  return (
    <MilestoneAddArea>
      <NewMilestoneHeader />
      <hr />
      <MilestoneEditor
        titleHandler={titleHandler}
        dueDateHandler={dueDateHandler}
        descriptionHandler={descriptionHandler}
        dateFormHandler={dateFormHandler}
      />
      <hr />
      <ButtonArea>
        <NewMilestoneBtn
          value="Create milestone"
          postNewMilestone={postNewMilestone}
        />
      </ButtonArea>
    </MilestoneAddArea>
  );
}

export default MilestoneAddPage;
