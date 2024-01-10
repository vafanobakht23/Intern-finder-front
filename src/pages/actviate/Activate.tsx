import { Button, Input } from "antd";
import { ACTIVATE_ACCOUNT } from "../../api/url/urls";
import React, { useState } from "react";
import { useCrudApi } from "../../api/useLazyApi";
import { useParams } from "react-router-dom";
import PinInput from "react-pin-input";

const Activate = () => {
  const { response, create } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ACTIVATE_ACCOUNT}`
  );
  const [code, setCode] = useState("");
  const { username } = useParams();
  const activateHandler = async () => {
    const formData = new FormData();
    formData.append("username", username!);
    formData.append("code", code!);
    await create(formData, false);
  };
  console.log(code);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="2xl:w-1/4 w-1/3 p-8 shadow-xl rounded-xl border-l-green-700 h-64">
        <div className="flex flex-col mb-4">
          <span className="text-green-800 text-lg mt-2">
            Activate your account
          </span>
          <span className="text-xs">You should check your email</span>
        </div>
        <PinInput
          length={5}
          onChange={(value, index) => {
            setCode(value);
          }}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
          inputStyle={{ borderColor: "black" }}
          inputFocusStyle={{ borderColor: "blue" }}
          onComplete={(value, index) => {
            setCode(value);
          }}
          autoSelect={true}
        />
        <Button
          onClick={activateHandler}
          className="text-black mt-3 underline cursor-pointer w-full bg-green-500"
        >
          Click{" "}
        </Button>
      </div>
    </div>
  );
};

export default Activate;
