import Joi from "joi";

export const loginValidate = (req) => {
  const schema = Joi.object({
    role: Joi.string().valid("user", "admin", "store", "staff").required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        "string.base": "Email is required*",
        "string.empty": "Email is required*",
        "any.required": "Email is required*",
      }),
    password: Joi.string().min(8).max(255).required().messages({
      "string.base": "Password is required*",
      "string.empty": "Password is required*",
      "any.required": "Password is required*",
      "string.min": "Password should have at least 8 characters",
    }),
  });
  return schema.validate(req);
};
