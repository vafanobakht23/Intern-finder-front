import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import Notification from "../../components/Notification";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../settings/Pages";
import { useCrudApi } from "../../api/useLazyApi";
import {
  CREATE_EXAM_API,
  EXAM_DELETE_API,
  EXAM_LIST_API,
  UPDATE_EXAM_API,
} from "../../api/url/urls";
import { Exam } from "types/Exam";

const AddTextInput: React.FC = () => {
  const [inputList, setInputList] = useState<string[]>([]); // Initialize as an empty array
  const [inputValue, setInputValue] = useState("");
  const [examId, setExamId] = useState(-1);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  console.log(examId);

  const [isUpdateMode, setUpdateMode] = useState(false);
  const { fetchAll: loadExams } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${EXAM_LIST_API}`
  );
  const getData = async () => {
    const resp = await loadExams();
    const l = JSON.parse(
      resp.filter((e: Exam) => String(e.post) === id)[0].content
    );
    setInputList(l);
    if (l.length > 0) {
      setExamId(resp.filter((e: Exam) => String(e.post) === id)[0].id);

      setUpdateMode(true);
    } else setUpdateMode(false);
  };
  console.log(inputList);

  useEffect(() => {
    getData();
  }, []);

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
  const { update: updateExam } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${UPDATE_EXAM_API}`
  );
  const { remove: removeExam } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${EXAM_DELETE_API}`
  );
  const handleSaveExam = async () => {
    if (inputList.length === 0) {
      Notification.openErrorNotification("Please enter at least one question");
    } else {
      const formData = new FormData();
      formData.append("post", String(id));
      formData.append("content", JSON.stringify(inputList));
      if (isUpdateMode) {
        const resp = await updateExam(examId, formData);
        Notification.openSuccessNotification("Exam updated successfully");
        setInputList(JSON.parse(resp.content));
      } else {
        const resp = await createExam(formData, true);
        Notification.openSuccessNotification("Exam created successfully");
      }
      navigate(Pages.PROFILE);
    }
  };
  const handleRemoveExam = (): void => {
    const resp = removeExam(examId);
    Notification.openSuccessNotification("Exam deleted successfully");
    navigate(Pages.PROFILE);
    setExamId(-1);
    setInputList([]);
  };

  return (
    <div className="mx-auto">
      <Navbar selectedKey="" />
      <div className="m-auto w-1/2 h-screen overflow-scroll shadow-md">
        <p className="my-4 mx-2 font-bold">Add exam</p>
        {inputList &&
          inputList.map((input, index) => (
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
          {examId !== -1 && (
            <div>
              <Button
                className="bg-gray-300-400 hover:text-white mr-10 ml-2"
                onClick={handleRemoveExam}
              >
                Remove exam
              </Button>
            </div>
          )}

          <div>
            <Button
              className="bg-gray-300-400 hover:text-white mr-3 ml-2"
              onClick={(): void => navigate(Pages.PROFILE)}
            >
              Cancel
            </Button>
            <Button
              className={`bg-green-400 hover:text-white ${
                examId === -1 ? "mr-10" : ""
              }`}
              onClick={handleSaveExam}
            >
              {isUpdateMode ? "Update" : "Save exam"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTextInput;
