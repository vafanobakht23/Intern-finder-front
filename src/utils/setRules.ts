const setRules = (
  message: string,
): { required: boolean; message: string }[] => {
  return [
    {
      required: true,
      message,
    },
  ];
};
export default setRules;
