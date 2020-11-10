import React, { useEffect, useState } from "react";
import axios from "axios";

export default function (SpecificComponent, option, adminRoute = null) {
  const [loading, setloading] = useState(true);
  function AuthenticationCheck(props) {
    useEffect(() => {
      axios.get("/api/user/auth").then((response) => {
        // 로그인 하지 않은 상태
        if (!response.data.verify) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          if (option === false) {
            // 로그인한유저 접속 막기
            props.history.push("/");
          }
        }
        setloading(false);
      });
    }, []);

    return !loading && <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
