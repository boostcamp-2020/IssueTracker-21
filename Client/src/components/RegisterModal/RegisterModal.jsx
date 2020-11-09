import React from "react";

function RegisterModal() {
  return (
    <div id="registerModal">
      <div id="registerTitle">회원가입</div>
      <form>
        <label htmlFor="idForm">Id</label>
        <input type="text" id="idForm" />

        <label htmlFor="pwFrom">password</label>
        <input type="text" id="pwFrom" />

        <label htmlFor="pwConfirmForm">password confirm</label>
        <input type="text" id="pwConfirmForm" />

        <label htmlFor="fileForm">프로필 첨부</label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          id="fileForm"
        />
      </form>
    </div>
  );
}

export default RegisterModal;
