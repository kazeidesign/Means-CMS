'use strict';

angular.module('myApp.admin', ['ngRoute'])

.controller('AdminCtrl', [function() {

}])

.controller('AdminBlogEditCtrl', function ($rootScope, sailsResource, $location) {

  var self = this;
  var blog = sailsResource('Blog');

  // Acces to a post
  var postUrlToTitle = $location.path().split("/");
  var postTitle = postUrlToTitle[3].split('_').join(' ');

  var blogPostTitle = blog.get({ title: postTitle });

  this.blogPost = blogPostTitle;

  this.saveBlog = function (blog) {
    blog.$save();
  };

  this.deleteBlog = function (blog) {
    blog.$delete();
  };


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

  $rootScope.$on('$sailsResourceUpdated', function () {
    self.updated++;
  });

  $rootScope.$on('$sailsResourceDestroyed', function () {
    self.destroyed++;
    $location.path('/admin/blog');
  });

})
