import { notification } from "antd";

const openSuccessNotification = (message: string): void => {
  notification.success({
    message: "Success",
    description: message,
  });
};
const openErrorNotification = (message: string): void => {
  notification.error({
    message: "Error",
    description: message,
  });
};
const notificationComponent = {
  openSuccessNotification,
  openErrorNotification,
};
export default notificationComponent;
