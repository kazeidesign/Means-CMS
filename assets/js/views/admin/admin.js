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
    templateUrl: 'admin/admin_blogEdit.html',
    controller: 'AdminBlogEditCtrl as post'
  })
  
  .when('/admin/blog-new', {
    templateUrl: 'admin/admin_blogNew.html',
    controller: 'BlogCtrl as post'
  })
  ;
}])

.controller('AdminCtrl', [function() {

}])

.controller('AdminBlogEditCtrl', function ($rootScope, sailsResource, $location) {
  
  var self = this;
  var blog = sailsResource('Blog');
  
  // Acces to a post
  var postUrlToTitle = $location.path().split("/");
  var postTitle = postUrlToTitle[3].split('_').join(' ');
  
  var blogPostTitle = sailsResource('Blog').get({ title: postTitle });

  this.blogPost = blogPostTitle;


// Cancel
  this.cancel = function () {
    self.simpleForm = new simple();
  };

  // Return an error in the console
  this.causeError = function () {
    blog.notFound(
      function (response) {
      },
      function (response) {
        self.error = response.statusCode;
      });
  };

  $rootScope.$on('$sailsResourceCreated', function () {
    self.created++;
  });
  
})