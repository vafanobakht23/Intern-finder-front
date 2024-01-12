import React from "react";
import { Pages } from "../settings/Pages";
import { useNavigate } from "../utils/useNavigation";
type Props = {
  text?: string;
  size?: string;
};

const NoData: React.FC<Props> = ({ text, size }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img
        role="presentation"
        className={`${size ?? "h-60"}`}
        alt=""
        src="/no-data.svg"
      />
      <div className="mt-6 text-lg text-gray-600 ">
        {" "}
        {text ?? "No data found!"}
      </div>
      <button
        className="bg-blue-500 px-2 py-2 mt-5 rounded-md "
        onClick={(): void => navigate(Pages.LOGIN)}
      >
        Back to Login
      </button>
    </div>
  );
};
export default NoData;
