"use strict"

const path = require('path')
const _ = require('lodash')
const utf8 = require('./libs/utf8')

module.exports = {

  getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object AsyncFunction]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    var val = toString.call(obj)
    return map[val];
  },

  /**
   * encode on utf8 obj deeply, which only affect on string, recursive for obj and array
   * @param obj
   * @returns obj
   */
  utf8DeepEncode(obj) {

    try {
      if (typeof obj === 'string') {
        obj = utf8.encode(obj)
      } else {
        for (let key in obj) {
          const utf8Key = utf8.encode(key)
          if (typeof obj[key] === 'string') {
            obj[key] = utf8.encode(obj[key])
          } else if (this.getType(obj[key]) === 'object') {
            obj[key] = this.utf8DeepEncode(obj[key])
          } else if (this.getType(obj[key]) === 'array') {
            for (let index in obj[key]) {
              obj[key][index] = this.utf8DeepEncode(obj[key][index])
            }
          }
          if (key !== utf8Key) {
            obj[utf8Key] = obj[key]
            delete obj[key]
          }
        }
      }
    } catch (err) {
      console.warn(`err: ${err.message}`)
    } finally {
      return obj
    }
  },

  /**
   * utf8 decode string
   * @param s
   * @returns {string}
   */
  utf8DecodeString(s) {

    let sReplicate = _.cloneDeep(s)
    try {
      if (typeof s === 'string') {
        sReplicate = utf8.decode(sReplicate)
      }
      return sReplicate
    } catch (err) {
      console.warn(`err: ${err.message}`)
      return s
    }
  },

  /**
   * decode on utf8 obj deeply, which only affect on string, recursive for obj and array
   * @param obj
   * @returns obj
   */
  utf8DeepDecode(obj) {

    try {
      if (typeof obj === 'string') {
        obj = this.utf8DecodeString(obj)
      } else {
        for (let key in obj) {
          const utf8Key = utf8.decode(key)
          if (typeof obj[key] === 'string') {
            obj[key] = this.utf8DecodeString(obj[key])
          } else if (this.getType(obj[key]) === 'object') {
            obj[key] = this.utf8DeepDecode(obj[key])
          } else if (this.getType(obj[key]) === 'array') {
            for (let index in obj[key]) {
              obj[key][index] = this.utf8DeepDecode(obj[key][index])
            }
          }
          if (key !== utf8Key) {
            obj[utf8Key] = obj[key]
            delete obj[key]
          }
        }
      }
    } catch (err) {
      console.warn(`err: ${err.message}`)
    } finally {
      return obj
    }
  },

  /**
   * unicode decode string
   * @param s
   * @returns {string}
   */
  unicodeDecodeString(s) {

    let sReplicate = _.cloneDeep(s)

    try {
      if (typeof s === 'string') {
        const regex = /\\u([\d\w]{4})/gi
        // if (regex.test(sReplicate)) sReplicate = unescape(sReplicate)
        sReplicate = sReplicate.replace(regex, function (match, grp) {
          return String.fromCharCode(parseInt(grp, 16))
        })
        sReplicate = unescape(sReplicate)
      }
      return sReplicate
    } catch (err) {
      console.warn(`err: ${err.message}`)
      return s
    }
  },

  /**
   * decode on unicode obj deeply, which only affect on string, recursive for obj and array
   * @param obj
   * @returns obj
   */
  unicodeDeepDecode(obj) {

    try {
      if (typeof obj === 'string') {
        obj = this.unicodeDecodeString(obj)
      } else {
        for (let key in obj) {
          if (typeof obj[key] === 'string') {
            obj[key] = this.unicodeDecodeString(obj[key])
            continue
          }
          if (this.getType(obj[key]) === 'object') {
            obj[key] = this.unicodeDeepDecode(obj[key])
            continue
          }
          if (this.getType(obj[key]) === 'array') {
            for (let index in obj[key]) {
              obj[key][index] = this.unicodeDeepDecode(obj[key][index])
            }
            continue
          }
        }
      }
    } catch (err) {
      console.warn(`err: ${err.message}`)
    } finally {
      return obj
    }
  },
}