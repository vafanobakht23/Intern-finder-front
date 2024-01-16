import { useCrudApi } from "../../api/useLazyApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ENROLLMENTS_UPDATE_API,
  ENROLLMENT_DETAIL_API,
  EXAM_DETAIL_API,
} from "../../api/url/urls";
import Notification from "../../components/Notification";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { Store } from "types/Store";
import { COMPANY, INTERN } from "../../constant/Constant";
import { Pages } from "../../settings/Pages";
import { useNavigate } from "../../utils/useNavigation";
import Navbar from "../../components/Navbar";
import NoData from "../../components/Nodata";

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

  const { id, enrollmentId } = useParams();
  const handleStatusIntern = async (
    enrollmentId: number,
    userId: number,
    isAccepted: boolean
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("user_id", String(userId));
    formData.append("post_id", String(Number(id)));
    if (user.role === INTERN) {
      formData.append("answers", JSON.stringify(answers));
      formData.append("status", "WF");
    } else formData.append("status", isAccepted ? "A" : "R");

    const resp = await updateEnrollment(enrollmentId, formData);
    navigate(Pages.DASHBOARD);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col m-auto overflow-y-auto h-screen pb-8 pt-2">
      <>
        <Navbar selectedKey="1" />
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div className="flex flex-col my-3 w-1/2 m-auto">
              <p className="mb-2">
                {question.includes("?") ? question : `${question}?`}
              </p>
              <TextArea
                disabled={user.role === COMPANY}
                className="rounded-xl"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)} // Handle input changes
              />
            </div>
          ))
        ) : (
          <NoData text="No exam is here!" size="h-96" />
        )}
        {user.role === INTERN ? (
          <div className="flex flex-row gap-x-2 w-1/2 mx-auto justify-end mt-4">
            <Button
              className="bg-gray-300-400 hover:text-white mr-3 ml-2 w-32 bg-gray-300 h-9"
              onClick={(): void => navigate(Pages.DASHBOARD)}
            >
              Cancel
            </Button>
            <button
              className={`bg-blue-500 hover:text-white w-32 py-1.5 rounded-md text-white text-sm hover:bg-blue-600 h-9 ${
                questions.length === 0 && "hidden"
              }`}
              onClick={() => {
                handleStatusIntern(Number(enrollmentId!), user.id, true);
                Notification.openSuccessNotification("You submited succefully");
              }}
            >
              {" "}
              Submit
            </button>
          </div>
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
      </>
    </div>
  );
};

export default TakeExam;
