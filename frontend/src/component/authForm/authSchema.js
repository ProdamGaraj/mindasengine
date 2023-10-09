import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const AuthSchema = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .required("Проверить"),
    login: yup
    .string()
    .min(50)
    .required("Проверить"),
});