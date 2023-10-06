import { useCrudApi } from "../../api/useLazyApi";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  ENROLLMENTS_UPDATE_API,
  ENROLLMENT_DETAIL_API,
  EXAM_DETAIL_API,
} from "../../api/url/urls";
import Notification from "../../components/Notification";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { Store } from "types/Store";
import { COMPANY, INTERN } from "../../constant/Constant";
import { Pages } from "../../settings/Pages";
import { useNavigate } from "../../utils/useNavigation";
import Navbar from "../../components/Navbar";

const TakeExam: React.FC = () => {
  const user = useSelector((state: Store) => state.user);
  const navigate = useNavigate();
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
  const [userId, setUserId] = useState(-1);
  useEffect(() => {
    const getData = async () => {
      const formData = new FormData();
      formData.append("post_id", String(id));
      formData.append("id", String(enrollmentId));
      const resp = await loadQuestions(formData, true);
      setQuestions(JSON.parse(resp[0].content));
      const enResp = await loadEnrollment(formData, true);
      setUserId(enResp[0].user);
      if (enResp[0].answers) setAnswers(JSON.parse(enResp[0].answers));
    };
    getData();
  }, []);
  console.log(answers);

  // this id for post id
  const { id, enrollmentId, status } = useParams();
  const handleStatusIntern = async (
    enrollmentId: number,
    userId: number,
    isAccepted: boolean
  ): Promise<any> => {
    const formData = new FormData();
    if (user.role === INTERN) {
      formData.append("user_id", String(userId));
      formData.append("post_id", String(Number(id)));
      formData.append("answers", JSON.stringify(answers));
      formData.append("status", "WF");
    } else {
      formData.append("user_id", String(userId));
      formData.append("post_id", String(Number(id)));
      formData.append("status", isAccepted ? "A" : "R");
      navigate(Pages.DASHBOARD);
    }
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
      <Navbar selectedKey="1" />
      {questions.map((question, index) => (
        <div className="flex flex-col my-3 w-1/2 m-auto">
          <p className="mb-2">
            {question.includes("?") ? question : `${question}?`}
          </p>
          <TextArea
            className="rounded-xl"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)} // Handle input changes
          />
        </div>
      ))}
      {user.role === INTERN ? (
        <Button
          className="w-1/2 m-auto rounded-md mt-5 bg-green-400"
          onClick={() => {
            handleStatusIntern(Number(enrollmentId!), user.id, true);
            Notification.openSuccessNotification("You submited succefully");
          }}
        >
          {" "}
          Submit
        </Button>
      ) : (
        <div className="flex flex-row gap-4 justify-end w-1/2 m-auto mt-3">
          <Button
            className="bg-green-400 w-32 text-center"
            onClick={(): Promise<any> =>
              handleStatusIntern(Number(enrollmentId!), userId, true)
            }
          >
            Accept
          </Button>
          <Button
            className="bg-red-300 w-32 text-center"
            onClick={(): Promise<any> =>
              handleStatusIntern(Number(enrollmentId!), userId, false)
            }
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
