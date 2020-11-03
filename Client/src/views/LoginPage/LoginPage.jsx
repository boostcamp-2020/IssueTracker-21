import React, { useState } from "react";
import "./style.css";
import logo from "../../../public/img/github.png";
import axios from "axios";

function LoginPage(props) {
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      userId: inputId,
      password: inputPassword,
    };
    try {
      axios.post("http://localhost:5000/api/user/login", data).then((res) => {
        //url수정필요, cookie가 추가가 안됨.
        props.history.push("/");
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="title">이슈잇슈</h1>
      <div className="loginBody">
        <form
          action="post"
          className="loginForm"
          onSubmit={(event) => onSubmitHandler(event)}
        >
          <label className="idLabel">아이디</label>
          <input
            type="text"
            className="id"
            name="id"
            onChange={(e) => setInputId(e.target.value)}
          />
          <label className="passwordLabel">비밀번호</label>
          <input
            type="password"
            className="password"
            name="password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <div className="buttons">
            <input type="submit" className="submit" value="로그인" />
            <input type="text" className="register" value="회원가입" />
          </div>
        </form>
        <button className="githubLogin">
          Sign in with GitHub{" "}
          <img src={logo} alt="github_logo" className="logo" />
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
