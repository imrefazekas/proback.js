proback.js - dependency-free very minimal helper for APIs with Promise/callback dual design

[![NPM](https://nodei.co/npm/assign.js.png)](https://nodei.co/npm/proback.js/)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

========

[proback.js](https://github.com/imrefazekas/proback.js) is an extremely tiny helper library to help the creation of APIs where functions are aimed to enable Promise-based and callback-based usage as well.

[Usage](#usage)
[Rules](#rules)


## Usage

Command line:

	npm install proback.js --save

In JS code:

	var Proback = require('proback.js');
	...
	assigner.assign( obj1, obj2[, obj3[, respect]] );
