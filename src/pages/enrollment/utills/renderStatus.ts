export const renderStatusFunc = (status: string): string => {
  if (status === "R") return "Rejected";
  if (status === "AP") return "Waiting for enroll exam";
  if (status === "WF") return "Wait for result";
  if (status === "A") return "Accepted";
  return "";
};

export const renderStatusColor = (status: string): string => {
  if (status === "R") return "bg-red-300";
  if (status === "AP") return "bg-orange-300";
  if (status === "WF") return "bg-orange-300";
  if (status === "A") return "bg-green-400";
  return "";
};
