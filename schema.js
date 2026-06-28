const Joi = require("joi");

module.exports.blogSchema = Joi.object({
  blog: Joi.object({
    title: Joi.string().required(),

    category: Joi.string().required(),

    preview: Joi.string().required(),

    content: Joi.string().required(),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    text: Joi.string().required(),
  }),
});
