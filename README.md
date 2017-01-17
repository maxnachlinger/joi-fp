#joi-fp

Provides a few wrappers around Joi's ``validate()``, ``attempt()`` and ``assert()`` functions with their arguments 
re-ordered for easier currying / partial application

[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[travis-image]: https://travis-ci.org/maxnachlinger/joi-fp.svg?branch=master
[travis-url]: https://travis-ci.org/maxnachlinger/joi-fp
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/

### Installation:
```
npm i joi-fp
```

### What problem does this solve?
When using functions like ``joi.validate()``, you will almost always have values for ``schema`` and/or ``options`` before you have the ``value`` being validated. This little library re-orders the arguments of ``joi.validate()``, ``joi.attempt()`` and ``joi.assert()`` allowing you to pass the data you have initially, well, initially :) This library also has a few versions of these functions with fixed arities to make currying and partial application easier.

### Quick Example
```javascript
const _ = require('lodash')
const joi = require('joi-fp')(require('joi'))

// example with currying
const validateInput = _.curry(joi.validateFp3)({
  name: joi.string().required()
})({allowUnknown: true});

validateInput({name: 'Max', color: 'blue'})
// { error: null, value: { name: 'Max', color: 'blue' } }

// example with partial application
const validateInputAgain = _.partial(joi.validateFp, {
  name: joi.string().required()
}, {allowUnknown: true});

validateInputAgain({name: 'Max', color: 'blue'}, (err, value) => {
  console.log(err, value) // null { name: 'Max', color: 'blue' }
})
```

### Functions
```javascript
// fixed arity for easy currying / partial application
validateFp2 (schema, value)
validateFp3 (schema, optionsOrValue, optionsOrCallback)
validateFp (schema, options, value, callback)

attemptFp2 (schema, value)
attemptFp (schema, message, value)

assertFp2 (schema, value)
assertFp (schema, message, value)
```
