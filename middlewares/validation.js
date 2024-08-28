const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error("string.uri");
  }
  return value;
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": "The imageUrl field is required.",
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    weather: Joi.string().required().valid("hot", "cold", "rainy").messages({
      "string.empty": "The weather field is required.",
      "string.uri": "Weather given is invalid.",
    }),
    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": "The imageUrl field is required.",
      "string.uri": "URL given is invalid.",
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": "The imageUrl field is required.",
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": "The avatar field is required.",
      "string.uri": "URL given is invalid.",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field is required.",
      "string.email": "Email given is invalid.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required.",
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field is required.",
      "string.email": "Email given is invalid.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field is required.",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required().messages({
      "string.empty": "The id field is required.",
      "string.hex": "The id field must be a hexadecimal value.",
      "string.length": "The id field must be 24 characters long.",
    }),
  }),
});
