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

### Quick Example
```javascript
const _ = require('lodash')
const joi = require('joi-fp')(require('joi'))

const validateName = _.curry(joi.validateFp2)({
  name: joi.string().required()
})

validateName({name: 'Max'}) // { error: null, value: { name: 'Max' } }

const validateInput = _.curry(joi.validateFp3)({
  name: joi.string().required()
})({allowUnknown: true});

validateInput({name: 'Max', color: 'blue'}) // { error: null, value: { name: 'Max', color: 'blue' } }
```

### Functions
```javascript
// fixed arity for easy currying / partial application
validateFp2 (schema, value)
validateFp3 (schema, optsOrValue, optsOrCb)
validateFp (schema, options, value, callback)

attemptFp2 (schema, value)
attemptFp (schema, message, value)

assertFp2 (schema, message, value)
assertFp (schema, message, value)
```
