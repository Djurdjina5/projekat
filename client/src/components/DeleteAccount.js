import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import Header from "./Header";

const DeleteAccount = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const acceptFunc = async () => {
    // e.preventDefault();
    const response = await authService.deleteAcc();
    if (response.status == 200) {
      setMessage("Налог је успешно обрисан!");
      navigate("/");
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
    <>
      <Header />
      <div className="container justify-content-center confDial">
        <h2 className="naslov2 mt-2">Брисање налога</h2>
        <Button
          className="btn-warning"
          onClick={confirm}
          icon="pi pi-check"
          label="Обриши налог"
          style={{ width: "150px", height: "60px" }}
        ></Button>
        <ConfirmDialog />
        {/* <alert ></alert> */}
      </div>
    </>
  );
};
export default DeleteAccount;
