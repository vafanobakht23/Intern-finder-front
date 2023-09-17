import React, { useState } from "react";
import { Input, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../settings/Pages";
import { useCrudApi } from "../../api/useLazyApi";
import { CREATE_EXAM_API } from "../../api/url/urls";

const AddTextInput: React.FC = () => {
  const [inputList, setInputList] = useState<string[]>([]); // Initialize as an empty array
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddInput = () => {
    if (inputList.length < 10 && inputValue.trim() !== "") {
      setInputList([...inputList, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveInput = (index: number) => {
    const updatedList = inputList.filter((_, i) => i !== index);
    setInputList(updatedList);
  };
  const { create: createExam } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${CREATE_EXAM_API}`
  );
  const handleSaveExam = async () => {
    const formData = new FormData();
    formData.append("post_id", String(id));
    formData.append("content", JSON.stringify(inputList));
    const resp = await createExam(formData, true);
  };

  return (
    <div className="mx-auto">
      <Navbar selectedKey="" />
      <div className="m-auto w-1/2 h-screen overflow-scroll shadow-md">
        <p className="my-4 mx-2 font-bold">Add exam</p>
        {inputList.map((input, index) => (
          <div
            key={index}
            className="mb-2 flex items-center space-x-2 gap-y-4 mt-4 mx-4"
          >
            <TextArea value={input} disabled />
            <Button onClick={() => handleRemoveInput(index)} type="dashed">
              Remove
            </Button>
          </div>
        ))}
        <div className="flex items-center space-x-2 gap-y-4 mt-4 mx-4">
          <TextArea
            rows={2}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a question"
          />
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddInput}
            type="primary"
            disabled={inputList.length >= 10 || inputValue.trim() === ""}
          >
            Add
          </Button>
        </div>
        <div className="w-full mx-4 mt-7 space-x-2 gap-y-4 flex flex-row-reverse">
          <Button
            className="bg-gray-300-400 hover:text-white mr-10 ml-2"
            onClick={(): void => navigate(Pages.DASHBOARD)}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-400 hover:text-white"
            onClick={handleSaveExam}
          >
            Save exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTextInput;
