'use strict';

angular.module('myApp.blog', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/blog', {
    templateUrl: 'blog/blog.html',
    controller: 'BlogCtrl as post'
  })
  
  .when('/blog/:title', {
    templateUrl: 'blog/blogDetail.html',
    controller: 'BlogDetailCtrl as post'
  })
  ;
}])

.controller('BlogCtrl', function ($rootScope, sailsResource) {
  
  var self = this;
  var blog = sailsResource('Blog');

  this.blogResource = blog;
  this.blogTypes = blog.query();
  
})

.controller('BlogDetailCtrl', function ($rootScope, sailsResource, $location) {
  
  var self = this;
  
  // Acces to a post
  var postUrlToTitle = $location.path().split("/");
  var postTitle = postUrlToTitle[2].split('_').join(' ');
  
  var blogPostTitle = sailsResource('Blog').get({ title: postTitle });

  this.blogPost = blogPostTitle;
  
})
