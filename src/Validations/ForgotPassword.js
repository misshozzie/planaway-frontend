import Joi from "joi";

export const ResetPasswordValidate = (req) => {
  const schema = Joi.object({
    role: Joi.string().valid("user").required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(8).max(40),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "Passwords do not match" }),
  });
  return schema.validate(req);
};
