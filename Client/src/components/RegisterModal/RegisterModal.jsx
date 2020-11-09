import React, { useState } from "react";
import styled from "styled-components";
import CustomBtn from "../CustomBtn";
import NewImage from "../../utils/uploadImgur";
import Axios from "axios";

function RegisterModal() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [Profile, setProfile] = useState("");

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const pwHandler = (e) => {
    setPassword(e.target.value);
  };
  const pwConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const profileHandler = async (e) => {
    try {
      const result = await NewImage(e, Profile, setProfile);
      if (result) {
        alert("프로필 이미지가 업로드 되었습니다.");
        setProfile(result.link);
      }
    } catch (e) {
      console.log("profile", e);
      alert("프로필 이미지 업로드에 실패했습니다.");
    }
  };

  const submitHandler = (e) => {
    if (
      Id.length === 0 ||
      Password.length === 0 ||
      PasswordConfirm.length === 0
    ) {
      return alert("빈칸을 모두 채워주세요");
    }

    if (Password !== PasswordConfirm) {
      return alert(
        "비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 확인해주세요"
      );
    }
    if (Password.length < 6) {
      return alert("비밀번호가 너무 짧습니다. 6자리 이상 입력해주세요");
    }

    const body = {
      userId: Id,
      password: Password,
      profile: Profile,
    };

    Axios.post("api/user/register", body).then((response) => {
      if (response.data.success) {
        alert("성공적으로 회원가입에 성공했습니다.");
        props.history.push("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  return (
    <RegisterModalStyle id="registerModal">
      <RegisterTitleStyle id="registerTitle">회원가입</RegisterTitleStyle>
      <form>
        <RegisterLabelStyle htmlFor="idForm">Id</RegisterLabelStyle>
        <RegisterInputStyle
          type="text"
          id="idForm"
          value={Id}
          onChange={idHandler}
        />

        <RegisterLabelStyle htmlFor="pwFrom">password</RegisterLabelStyle>
        <RegisterInputStyle
          type="password"
          id="pwFrom"
          value={Password}
          onChange={pwHandler}
        />

        <RegisterLabelStyle htmlFor="pwConfirmForm">
          password confirm
        </RegisterLabelStyle>
        <RegisterInputStyle
          type="password"
          id="pwConfirmForm"
          value={PasswordConfirm}
          onChange={pwConfirmHandler}
        />

        <RegisterLabelStyle htmlFor="fileForm">프로필 첨부</RegisterLabelStyle>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={profileHandler}
          id="fileForm"
        />
        <RegisterSubmitStyle>
          <CustomBtn
            type="button"
            color="white"
            bgColor="#2ea44f"
            width="150px"
            borderRad="6px"
            height="35px"
            border="0"
            id="submitBtn"
            onClick={submitHandler}
          >
            회원가입하기
          </CustomBtn>
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
