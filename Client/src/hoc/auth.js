import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function fetchData(setVerify) {
  return new Promise((resolve) => {
    axios.get("/api/user/auth").then((res) => {
      setVerify(res.data.verify);
      resolve(res.data.verify);
    });
  });
}

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const [verify, setVerify] = useState(true);
    console.log();
    //back에 req날리기
    useEffect(async () => {
      const response = await fetchData(setVerify);
      if (!response) {
        //로그인 안된 상태
        if (option) {
          props.history.push("/login");
        }
      } else {
        //로그인 상태
        if (option === false) {
          props.history.push("/");
        }
      }
      return <SpecificComponent {...props} />;
    }, []);

    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
