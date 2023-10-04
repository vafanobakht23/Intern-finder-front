export const renderStatusFunc = (status: string): string => {
  if (status === "R") return "Rejected";
  if (status === "AP ") return "Applied";
  if (status === "AC") return "Ready for exam";
  if (status === "S") return "Succefull";
  return "Waiting for enroll exam";
};
