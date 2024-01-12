import { Alert, Button } from "antd";
import { ACTIVATE_ACCOUNT } from "../../api/url/urls";
import { useEffect, useState } from "react";
import { useCrudApi } from "../../api/useLazyApi";
import { useParams } from "react-router-dom";
import PinInput from "react-pin-input";
import Notification from "../../components/Notification";
import { useNavigate } from "../../utils/useNavigation";
import { Pages } from "../../settings/Pages";

const Activate = () => {
  const navigate = useNavigate();
  const { create } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ACTIVATE_ACCOUNT}`
  );
  const [code, setCode] = useState("");
  const { username } = useParams();
  const activateHandler = async () => {
    const formData = new FormData();
    formData.append("username", username!);
    formData.append("code", code!);
    try {
      const res = await create(formData, false);
      //@ts-ignore
      if (res.msg === "Error") {
        Notification.openErrorNotification(
          "The activation code is not correct"
        );
      } else {
        Notification.openSuccessNotification("Your account is active now");
        navigate(Pages.LOGIN);
      }
    } catch (e) {}
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="2xl:w-1/4 w-1/3 p-8 shadow-xl rounded-xl border-l-green-700 h-72  ">
        <div className="flex flex-col mb-4">
          <span className="text-blue-700 text-lg mt-2">
            Activate your account
          </span>
          <Alert
            message="You should check your email"
            type="info"
            className="mt-2 mb-2"
          />
        </div>
        <PinInput
          length={5}
          onChange={(value) => setCode(value)}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
          inputStyle={{ borderColor: "black" }}
          inputFocusStyle={{ borderColor: "blue" }}
          onComplete={(value) => setCode(value)}
          autoSelect={true}
        />
        <Button
          onClick={activateHandler}
          className="text-black mt-6 underline cursor-pointer w-full bg-blue-500"
        >
          Click{" "}
        </Button>
      </div>
    </div>
  );
};

export default Activate;
