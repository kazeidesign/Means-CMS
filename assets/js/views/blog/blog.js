'use strict';

angular.module('myApp.blog', ['ngRoute'])

.controller('BlogCtrl', function ($rootScope, sailsResource) {

  var self = this;
  var blog = sailsResource('Blog');

  this.blogResource = blog;
  this.blogForm = new blog();
  this.blogTypes = blog.query();



  this.add = function () {
    self.blogForm.$save(function (newblog) {
      self.blogTypes.push(newblog);
    });
    self.blogForm = new blog();
  };

  this.cancel = function () {
    self.blogForm = new blog();
  };

  this.deleteBlog = function (blog) {
    blog.$delete();
  };

  this.editBlog = function (blog) {
    blog.$editing = true;
  };

  this.saveBlog = function (blog) {
    blog.$save();
    blog.$editing = false;
  };

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
  });

})

.controller('BlogDetailCtrl', function ($rootScope, sailsResource, $location, $routeParams) {

  var self = this;
  var blog = sailsResource('Blog');
  // Acces to a post
  var postUrlToTitle = $location.path().split("/");
  var postTitle = postUrlToTitle[2].split('_').join(' ');

  var currentBlogPost = sailsResource('Blog').get({ title: postTitle });

  this.blogPost = currentBlogPost;
})
