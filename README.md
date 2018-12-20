# utf8-deep-converter

Utf8 converter, recursive converting for deep type such as Object and Array, will auto detect if it is encoded

[![npm install utf8-deep-converter](https://nodei.co/npm/utf8-deep-converter.png?mini=true)](https://www.npmjs.com/package/utf8-deep-converter)

## 1. Install

```bash
$ npm install --save utf8-deep-converter
```

## 2. Usage

```javascript
const converter = require('utf8-deep-converter')

converter.utf8DeepEncode({obj:'可以',数组:['也','可以'],normal:'pass'}) //utf8 encode
// {"obj":"å¯ä»¥","normal":"pass","æ°ç»":["ä¹","å¯ä»¥"]}
converter.utf8DeepDecode({"obj":"å¯ä»¥","normal":"pass","æ°ç»":["ä¹","å¯ä»¥"]}) //utf8 decode
// {"obj":"可以","normal":"pass","数组":["也","可以"]}
```

## 3. Api

### Init

```
const converter = require('utf8-deep-converter')
```

### Function

#### converter.utf8DeepEncode()

encode utf8 type data

|arguments|required|description|
|:------:|:------:|------|
|obj|true|will recursive encode, auto passing normal type|

#### converter.utf8DeepDecode()

decode utf8 type data

|arguments|required|description|
|:------:|:------:|------|
|obj|true|will recursive encode, auto passing normal type|
