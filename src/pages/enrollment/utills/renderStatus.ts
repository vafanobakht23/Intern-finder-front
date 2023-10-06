export const renderStatusFunc = (status: string): string => {
  if (status === "R") return "Rejected";
  if (status === "AP ") return "Applied";
  if (status === "AC") return "Ready for enroll exam";
  if (status === "WF") return "Wait for result";
  if (status === "A") return "Accepted";
  return "Waiting for enroll exam";
};
