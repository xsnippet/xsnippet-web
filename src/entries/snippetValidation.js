import Joi from 'joi'

const schema = Joi.object().keys({
  content: Joi.string().required(),
})

export const validateSnippet = value => Joi.validate(value, schema)
