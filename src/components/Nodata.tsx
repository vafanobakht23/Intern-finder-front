import React from "react";
type Props = {
  text?: string;
  size?: string;
};

const NoData: React.FC<Props> = ({ text, size }: Props) => {
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
    </div>
  );
};
export default NoData;
