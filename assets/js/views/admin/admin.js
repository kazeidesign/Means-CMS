'use strict';

angular.module('myApp.admin', ['ngRoute', 'textAngular'])

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
    $location.path('/admin/blog');
  });

  $rootScope.$on('$sailsResourceUpdated', function () {
    self.updated++;
  });

  $rootScope.$on('$sailsResourceDestroyed', function () {
    self.destroyed++;
    $location.path('/admin/blog');
  });

})

.controller('AdminPageEditCtrl', function ($rootScope, sailsResource, $location) {

  var self = this;
  var page = sailsResource('Page');

  this.pageResource = page;
  this.pageForm = new page();
  this.pageTypes = page.query();

  // Acces to a page
  var folioUrlToTitle = $location.path().split("/");
  var folioTitle = folioUrlToTitle[3].split('_').join(' ');

  var currentPage = sailsResource('Page').get({ title: folioTitle });

  this.pageFolio = currentPage;

  this.add = function () {
    self.pageForm.$save(function (newpage) {
      self.pageTypes.push(newpage);
    });
    self.pageForm = new page();
  };

  this.cancel = function () {
    self.pageForm = new page();
  };

  this.deletePage = function (page) {
    page.$delete();
  };

  this.editPage = function (page) {
    page.$editing = true;
  };

  this.savePage = function (page) {
    page.$save();
    page.$editing = false;
  };

  this.causeError = function () {
    page.notFound(
      function (response) {
      },
      function (response) {
        self.error = response.statusCode;
      });
  };

  $rootScope.$on('$sailsResourceCreated', function () {
    self.created++;
    $location.path('/admin/pages');
  });

  $rootScope.$on('$sailsResourceUpdated', function () {
    self.updated++;
  });

  $rootScope.$on('$sailsResourceDestroyed', function () {
    self.destroyed++;
    $location.path('/admin/pages');
  });


})
