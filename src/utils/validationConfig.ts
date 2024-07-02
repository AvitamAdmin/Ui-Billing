import { ValidationValueMessage } from 'react-hook-form';

export const validationSchema = {
  phoneNumber: {
    minLength: 6,
    maxLength: 14,
  },
  password: {
    minLength: 2,
    maxLength: 30,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
};

export const emailValidation = (v: string): boolean | string => {
  const emailRegx = /^[a-z-0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,7}$/i;
  if (v) {
    return emailRegx.test(v) || ("labels.EmailErrMsg");
  } else return true;
};

export const requiredValidation = (
  label: string,
): ValidationValueMessage<boolean> => {
  return { value: true, message: getRquiredMessage(label) };
};

export const getRquiredMessage = (feild: string): string => {
  return `${feild} ${("labels.isRequired")}`;
};

export const getMinLengthMessage = (length: number): string => {
  return `${("labels.minLength")} ${length} ${("labels.charactersRequired")}.`;
};

export const minLengthValidation = (
  length: number,
): ValidationValueMessage<number> => {
  return { value: length, message: getMinLengthMessage(length) };
};