'use strict';

angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  
  .when('/admin', {
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  })
  
  .when('/admin/blog', {
    templateUrl: 'admin/admin_blog.html',
    controller: 'BlogCtrl as post'
  })
  
  .when('/admin/blog/:title', {
    templateUrl: 'admin/admin_blogDetail.html',
    controller: 'AdminBlogDetailCtrl as post'
  })
  ;
}])

.controller('AdminCtrl', [function() {

}])

.controller('AdminBlogDetailCtrl', function ($rootScope, sailsResource, $location) {
  
  var self = this;
  
  // Acces to a post
  var postUrlToTitle = $location.path().split("/");
  var postTitle = postUrlToTitle[3].split('_').join(' ');
  
  var blogPostTitle = sailsResource('Blog').get({ title: postTitle });

  this.blogPost = blogPostTitle;
  
})