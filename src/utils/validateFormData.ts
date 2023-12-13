export const validateFormData = (formData: FormData): boolean => {
  let isEmpty = false;
  for (const [key, value] of formData.entries()) {
    if (value === "") isEmpty = true;
  }
  return isEmpty;
};
