'use strict'
const test = require('tape')
const _ = require('lodash/fp')
const joi = require('../lib')(require('joi'))

test('currying tests - simple schema', t => {
  const simpleSchema = {
    name: joi.string().required()
  }

  t.test('validateFp2', t => {
    const validate = _.curry(joi.validateFp2)(simpleSchema);

    [
      {
        desc: 'Required prop not supplied',
        fx: () => validate({age: 12}),
        ok: false,
        errorMsg: 'child "name" fails because ["name" is required]'
      },
      {
        desc: 'Required prop wrong type',
        fx: () => validate({name: 12}),
        ok: false,
        errorMsg: 'child "name" fails because ["name" must be a string]'
      },
      {
        desc: 'Required prop supplied, additional prop not allowed',
        fx: () => validate({name: 'test', ago: 12}),
        ok: false,
        errorMsg: '"ago" is not allowed'
      },
      {
        desc: 'Required prop passed',
        fx: () => validate({name: 'test'}),
        ok: true,
        value: {name: 'test'}
      }
    ].forEach((o) => {
      const result = o.fx()

      if (o.ok) {
        t.ok(result.value, o.desc)
        t.deepEqual(o.value, result.value, `${o.desc} - returns the expected value`)
        return
      }

      t.ok(result.error, o.desc)
      t.equal(o.errorMsg, result.error.message, `${o.desc} - returns expected error message`)
    })

    t.end()
  })

  t.test('validateFp3', t => {
    const validate = _.curry(joi.validateFp3)(simpleSchema);

    [
      {
        desc: 'Required prop not supplied',
        fx: () => validate({allowUnknown: false})({age: 12}),
        ok: false,
        errorMsg: 'child "name" fails because ["name" is required]'
      },
      {
        desc: 'Required prop wrong type',
        fx: () => validate({allowUnknown: false})({name: 12}),
        ok: false,
        errorMsg: 'child "name" fails because ["name" must be a string]'
      },
      {
        desc: 'Required prop supplied, additional prop not allowed',
        fx: () => validate({allowUnknown: false})({name: 'test', ago: 12}),
        ok: false,
        errorMsg: '"ago" is not allowed'
      },
      {
        desc: 'Required prop supplied, additional prop allowed',
        fx: () => validate({allowUnknown: true})({name: 'test', age: 12}),
        ok: true,
        value: {name: 'test', age: 12}
      },
      {
        desc: 'Required prop passed',
        fx: () => validate({allowUnknown: false})({name: 'test'}),
        ok: true,
        value: {name: 'test'}
      }
    ].forEach((o) => {
      const result = o.fx()

      if (o.ok) {
        t.ok(result.value, o.desc)
        t.deepEqual(o.value, result.value, `${o.desc} - returns the expected value`)
        return
      }

      t.ok(result.error, o.desc)
      t.equal(o.errorMsg, result.error.message, `${o.desc} - returns expected error message`)
    })

    t.end()
  })
})
