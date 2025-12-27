import { register } from "./services/register";
import { login } from "./services/login";
import { me } from "./services/me";

export const authServices = {
  register,
  login,
  me,
};

export default authServices;
