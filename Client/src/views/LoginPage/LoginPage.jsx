import React from "react";
import "./style.css";
import logo from "../../../public/img/github.png";
import axios from "axios";

function LoginPage() {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const params = new URLSearchParams([...new FormData(e.target).entries()]);
    try {
      let loginInfo = axios
        .post("http://118.67.132.17:5000/api/user/login", { body: params })
        .then((res) => {
          //url수정필요
          console.log(res);
        });
      console.log(loginInfo);
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
          <input type="text" className="id" name="id" />
          <label className="passwordLabel">비밀번호</label>
          <input type="password" className="password" name="password" />
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
