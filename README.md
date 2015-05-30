# progenitor.js

[![Circle CI](https://circleci.com/gh/bnorton/progenitor.js.svg?style=svg)](https://circleci.com/gh/bnorton/progenitor.js)
[![npm version](https://badge.fury.io/js/progenitor.js.svg)](http://badge.fury.io/js/progenitor.js)

#Getting started

###Install it
```bash
$ npm install progenitor.js
```

###Require it
```javascript
var progenitor = require('progenitor.js');
```

###Use it
```javascript
// To enable inheritance from Object and Error
Object.progeny = progenitor(Object);
Error.progeny = progenitor(Error);
```

then

```javascript
BaseController = Object.progeny('BaseController', {
  // Instance methods
}, {
  classMethods: {
  }
});
```

The interface to inherit is `progeny(newName, instanceMethods, options)`
 - options can have a key `classMethods` that add methods to the class itself.
 - the class is accessible via `this.class`.
 - the special instance method `init` is called when during the process of returning a new object.
 - the special instance method `this.super(functionName, *args)` will call any super class instance method. (Note: it will not error if the method does not exist)
 - the special class method `inherited` is called during the process of generating a new derived class.
