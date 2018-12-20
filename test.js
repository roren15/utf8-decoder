'use strict'

const utils = require('./utils')
const json = require('circular-json')
const obj = {
  作者: '罗仑',
  数组: ['这', '是', '数组'],
  array: ['it', 'is', 'array']
}

console.info(`for origin obj is: ${json.stringify(obj)}`)
const obj_encode_utf8 = utils.utf8DeepEncode(obj)
console.info(`utf8 encode for: ${json.stringify(obj_encode_utf8)}`)
const obj_dncode_utf8 = utils.utf8DeepDecode(obj_encode_utf8)
console.info(`utf8 decode for: ${json.stringify(obj_dncode_utf8)}`)