'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'sailsResource',
  'myApp.route',
  'myApp.page',
  'myApp.blog',
  'myApp.admin',
  'myApp.version',
  'myApp.comment'
])

.filter('underscoreless',function() {
    return function(input) {
        if (input) {
            return input.split(' ').join('_');
        }
    }
})
