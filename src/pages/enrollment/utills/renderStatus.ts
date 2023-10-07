export const renderStatusFunc = (status: string): string => {
  if (status === "R") return "Rejected";
  if (status === "AP ") return "Applied";
  if (status === "AC") return "Ready for enroll exam";
  if (status === "WF") return "Wait for result";
  if (status === "A") return "Accepted";
  return "Waiting for enroll exam";
};

export const renderStatusColor = (status: string): string => {
  if (status === "R") return "bg-red-300";
  if (status === "AP ") return "bg-blue-300";
  if (status === "AC") return "bg-blue-300";
  if (status === "WF") return "bg-blue-300";
  if (status === "A") return "bg-blue-300";
  return "bg-white";
};
