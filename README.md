# MEAN-Sails-CMS

CMS with MEAN stack with Sails.js = [Mean-Sails-Stack](http://github.com/kazeidesign/Mean-Sails-Stack).

<!--
## Ready to use

This app is ready to use. Clone this repository ``` git clone https://github.com/kazeidesign/Mean-Sails-Stack.git ``` in your server.

Run `` cd Mean-Sails-Stack/ && npm install && sails lift ``.

/!\ At the first `` sails lift ``, wait less than one minute for the automatical bower install.

Look in your browser at [localhost:1337](http://localhost:1337). Your Sails.js app is ready and you can use Angular.js.

## Getting Started

#### Needed

[Node.js](https://nodejs.org/en/): version 4.4.4 LTS or later

[Sails.js](http://sailsjs.org): version 0.12.3 or later

<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>: version 2.4.0 or later

<a href="https://angularjs.org/" target="_blank">Angular.js</a>: version 1.5.5 or later

[Grunt-sass](https://www.npmjs.com/package/grunt-sass): version 1.2.0 or later

[Angular-Resource-Sails](https://github.com/angular-resource-sails/angular-resource-sails): version 1.2.2

[Angular-Material](https://github.com/angular/material): version 1.1.0 or later

[Html5-boilerplate](https://github.com/h5bp/html5-boilerplate): version 5.3.0 or later

---

#### CRUD between AngularJS and SailsJS

```javascript
var app = angular.module("MyApp", ['sailsResource']);

.controller('HomeController', function ($rootScope, sailsResource) {
  var self = this;
  var simple = sailsResource('Simple', {
    nocache: {method: 'GET', isArray: true, cache: false},
    count: {method: 'GET', url: '/simple/count'},
    notFound: {method: 'GET', url: '/whoa/there'}
  });

  this.simpleResource = simple;
  this.created = 0;
  this.updated = 0;
  this.destroyed = 0;
  this.simpleForm = new simple();
  this.simpleTypes = simple.query(function () {
    self.refreshServerCount();
  });
  simple.nocache(function (startingTypes) {
    self.startingCount = startingTypes.length;
  });

  this.add = function () {
    self.simpleForm.$save(function (newItem) {
      self.simpleTypes.push(newItem);
      self.refreshServerCount();
    });
    self.simpleForm = new simple();
  };
  this.refreshServerCount = function () {
    // Tests the custom URL functionality
    self.serverCount = simple.count();
  };

  this.cancel = function () {
    self.simpleForm = new simple();
  };
  this.deleteSimple = function (simple) {
    simple.$delete(function () {
      self.refreshServerCount();
    });
  };
  this.editSimple = function (simple) {
    simple.$editing = true;
  };
  this.saveSimple = function (simple) {
    simple.$save();
    simple.$editing = false;
  };
  this.findByEmail = function () {
    self.foundSimple = simple.get({email: self.searchEmail});
    self.searchEmail = '';
  };
  this.causeError = function () {
    simple.notFound(
      function (response) {
      },
      function (response) {
        self.error = response.statusCode;
      });
  };

  $rootScope.$on('$sailsResourceCreated', function () {
    self.created++;
  });
  $rootScope.$on('$sailsResourceUpdated', function () {
    self.updated++;
  });
  $rootScope.$on('$sailsResourceDestroyed', function () {
    self.destroyed++;
  });
});
```

---

### Example

 Under development

API Reference
--------------

### Sails.JS REST ###
Angular Sails wraps the native sails.js REST functions. For further information check out [the sails docs](http://sailsjs.org/#!documentation/sockets) and [Mike's Screencast](http://www.youtube.com/watch?v=GK-tFvpIR7c)

### Native socket functions ###
The sails service is nothing more like the native socket.io object!

Enjoy!

[KazeiDesign](https://github.com/kazeidesign)

---

#### To do

* Doc
* To do example
* Post example
* Front office & Back office example
* [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint)
* [grunt-sass-lint](https://github.com/sasstools/grunt-sass-lint)
* [grunt-postcss](https://github.com/nDmitry/grunt-postcss)
-->
