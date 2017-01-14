'use strict'

module.exports = (joi) => {
  if (!joi) {
    throw new Error('requires an instance of Joi.')
  }

  joi.validateFp = (schema, options, value, callback) => {
    return joi.validate.apply(joi, [value, schema, options, callback].filter((a) => !!a))
  }

  joi.attemptFp = (schema, message, value) => joi.attempt.apply(joi, [value, schema, message].filter((a) => !!a))

  joi.assertFp = joi.attemptFp

  // functions with fixed arity for partial application and currying
  joi.validateFp2 = (schema, value) => joi.validateFp(schema, null, value)

  joi.validateFp3 = (schema, optionsOrValue, last) => {
    // optionsOrValue is our value
    if (typeof last === 'function') {
      return joi.validateFp(schema, null, optionsOrValue, last)
    }

    // last is our value
    return joi.validateFp(schema, optionsOrValue, last)
  }

  joi.attemptFp2 = (schema, value) => joi.attemptFp(schema, null, value)

  joi.assertFp2 = joi.attemptFp2

  return joi
}
