import { useCrudApi } from "../../api/useLazyApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ENROLLMENTS_UPDATE_API,
  ENROLLMENT_DETAIL_API,
  EXAM_DETAIL_API,
} from "../../api/url/urls";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { Store } from "types/Store";
import { COMPANY } from "../../constant/Constant";

const TakeExam: React.FC = () => {
  const user = useSelector((state: Store) => state.user);
  const { update: updateEnrollment } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENTS_UPDATE_API}`
  );
  const { create: loadQuestions } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${EXAM_DETAIL_API}`
  );
  const { create: loadEnrollment } = useCrudApi(
    `${import.meta.env.VITE_REACT_APP_API}${ENROLLMENT_DETAIL_API}`
  );
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => {
    const getData = async () => {
      const formData = new FormData();
      formData.append("post_id", String(id));
      formData.append("id", String(enrollmentId));
      const resp = await loadQuestions(formData, true);
      setQuestions(JSON.parse(resp[0].content));
      const enResp = await loadEnrollment(formData, true);
      if (enResp[0].answers) setAnswers(JSON.parse(enResp[0].answers));
    };
    getData();
  }, []);
  console.log(answers);

  // this id for post id
  const { id, enrollmentId, status } = useParams();
  const handleAnswerSubmit = async (
    enrollmentId: number,
    userId: number,
    isAccepted: boolean
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("user_id", String(userId));
    formData.append("post_id", String(Number(id)));
    formData.append("answers", JSON.stringify(answers));
    formData.append("status", "WF");
    const resp = await updateEnrollment(enrollmentId, formData);
    console.log(resp);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col m-auto">
      {questions.map((question, index) => (
        <div className="flex flex-col my-3 w-1/2 m-auto">
          <p className="mb-2">
            {question.includes("?") ? question : `${question}?`}
          </p>
          <TextArea
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)} // Handle input changes
          />
        </div>
      ))}
      {user.role !== COMPANY && (
        <Button
          className="w-1/2 m-auto rounded-md mt-5 bg-green-400"
          onClick={() =>
            handleAnswerSubmit(Number(enrollmentId!), user.id, true)
          }
        >
          {" "}
          Submit
        </Button>
      )}
    </div>
  );
};

export default TakeExam;
