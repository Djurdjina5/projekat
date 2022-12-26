import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { Button } from "primereact/button";
import authService from "../services/auth-service";

const DeleteAccount = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const acceptFunc = async () => {
    // e.preventDefault();
    const response = await authService.deleteAcc();
    if (response.status == 200) {
      setMessage("Налог је успешно обрисан!");
    }
    console.log(response);
  };

  const rejectFunc = () => {
    //navigate to home page
    console.log("i am in rejectFunc");
  };

  const confirm = () => {
    confirmDialog({
      message: "Да ли сте сигурни да желите да обришете налог?",
      header: "Потврда",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptFunc(),
      reject: () => rejectFunc(),
    });
  };

  return (
    <div className="container justify-content-center">
      <h2 className="naslov2 mt-2">Брисање налога</h2>
      <Button
        className="dark mt-4"
        onClick={confirm}
        icon="pi pi-exclamation-triangle"
        label="Обриши налог"
        style={{ width: "150px", height: "60px" }}
      ></Button>
      <ConfirmDialog style={{ width: "50vw", color: "rebeccapurple" }} />
      {/* <alert ></alert> */}
    </div>
  );
};
export default DeleteAccount;
