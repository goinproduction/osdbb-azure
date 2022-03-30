import Joi from "joi";

export default class UserValidator {
  registerSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string()
      .regex(/^[^0-9][a-zA-Z0-9_]+$/)
      .required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
      .required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string()
      .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/)
      .required(),
  });
}
