import Joi from 'joi'

const schema = Joi.object().keys({
  content: Joi.string().required(),
})

export const validateSnippet = (value: string): string | null => {
  const result: Joi.ValidationResult = schema.validate(value)

  if (result.error) {
    return reasons(result.error.details)
  }

  return null
}

const messages = new Map<string, string>([
  ['content.string.empty', 'Content is required :('],
  ['default', 'Something went wrong, please check all fields'],
])

const reasons = (details: Joi.ValidationErrorItem[]): string => {
  const errors: string[] = []

  details.forEach(element => {
    const reason = `${element.path[0]}.${element.type}`

    errors.push(messages.has(reason)
      ? messages.get(reason)
      : messages.get('default'),
    )
  })

  return errors[0]
}
