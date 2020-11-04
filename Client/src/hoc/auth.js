import React, { useEffect } from "react";
import axios from "axios";
import LoginPage from "../views/LoginPage";
import LandingPage from "../views/LandingPage";
import { useState } from "react";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const [verify, setVerify] = useState(true);

    //back에 req날리기
    useEffect(() => {
      console.log("fetch");
      async function fetchData() {
        await axios.get("http://localhost:5000/api/user/auth").then((res) => {
          console.log(res.data);
          setVerify(res.data.verify);
        });
      }
      fetchData();
    }, []);

    return option == null ? (
      <SpecificComponent />
    ) : option ? (
      verify ? (
        <SpecificComponent />
      ) : (
        <LoginPage />
      )
    ) : verify ? (
      <LandingPage />
    ) : (
      <SpecificComponent />
    );
  }

  return AuthenticationCheck;
}
