//for user registration
import Joi from "joi";

export const RegisterValid = (req) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Name is required*",
            "string.empty": "Name is required*",
            "any.required": "Name is required*",
        }),

        email: Joi.string()
        .required()
        .email({tlds: {allow:false}})
        .messages ({
        "string.base": "Email is required*",
        "string.empty": "Email is required*",
        "any.required": "Email is required*"
        }),

        password: Joi.string().min(8).max(255).required().messages({
            "string.base": "Password is required*",
            "string.empty": "Password is required*",
            "any.required": "Password is required*",
            "string.min": "Password should have at least 8 characters"  
        }),
        role: Joi.string().valid("user").required(),
    });
    return schema.validate(req);
};