import Joi from 'joi'

const schema = Joi.object().keys({
  content: Joi.string().required(),
})

export const validateSnippet = value => {
  const result = Joi.validate(value, schema)

  if (result.error) {
    return reasons(result.error.details)
  }

  return null
}

const messages = new Map([
  ['content.any.empty', 'Content is required :('],
  ['default', 'Something went wrong, please check all fields'],
])

const reasons = details => {
  const errors = []

  details.forEach(element => {
    const reason = `${element.path[0]}.${element.type}`

    errors.push(messages.has(reason)
      ? messages.get(reason)
      : messages.get('default')
    )
  })

  return errors[0]
}
