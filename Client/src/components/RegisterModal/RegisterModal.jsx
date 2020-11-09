import React from "react";
import styled from "styled-components";

function RegisterModal() {
  return (
    <RegisterModalStyle id="registerModal">
      <RegisterTitleStyle id="registerTitle">회원가입</RegisterTitleStyle>
      <form>
        <RegisterLabelStyle htmlFor="idForm">Id</RegisterLabelStyle>
        <RegisterInputStyle type="text" id="idForm" />

        <RegisterLabelStyle htmlFor="pwFrom">password</RegisterLabelStyle>
        <RegisterInputStyle type="password" id="pwFrom" />

        <RegisterLabelStyle htmlFor="pwConfirmForm">
          password confirm
        </RegisterLabelStyle>
        <RegisterInputStyle type="password" id="pwConfirmForm" />

        <RegisterLabelStyle htmlFor="fileForm">프로필 첨부</RegisterLabelStyle>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          id="fileForm"
        />
        <RegisterSubmitStyle>
          <button type="submit">회원가입</button>
        </RegisterSubmitStyle>
      </form>
    </RegisterModalStyle>
  );
}

export default RegisterModal;

const RegisterModalStyle = styled.div`
  width: 50%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RegisterTitleStyle = styled.div`
  width: 100%;
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RegisterLabelStyle = styled.label`
  font-size: 15px;
  font-weight: 400;
  margin-top: 15px;
`;

const RegisterInputStyle = styled.input`
  font-size: 20px;
  height: 30px;
  font-weight: 400;
`;

const RegisterSubmitStyle = styled.div`
  width: 100%;
  font-size: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const submitBtnStyle = styled.button`
  border-radius: 6px;
  background-color: green;
`;
