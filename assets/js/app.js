'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'sailsResource',
  'myApp.blog',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/blog'});
}])

.filter('underscoreless',function() {
    return function(input) {
        if (input) {
            return input.split(' ').join('_');    
        }
    }
})