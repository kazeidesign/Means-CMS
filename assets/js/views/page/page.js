'use strict';

angular.module('myApp.page', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/pages', {
    templateUrl: 'page/pages.html',
    controller: 'PageCtrl as folio'
  })

  .when('/:title', {
    templateUrl: 'page/pageDetail.html',
    controller: 'PageDetailCtrl as folio'
  })
  ;
}])

.controller('PageCtrl', function ($rootScope, sailsResource) {

  var self = this;
  var page = sailsResource('Page');

  this.pageResource = page;
  this.pageForm = new page();
  this.pageTypes = page.query();



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
  });

  $rootScope.$on('$sailsResourceUpdated', function () {
    self.updated++;
  });

  $rootScope.$on('$sailsResourceDestroyed', function () {
    self.destroyed++;
  });

})

.controller('PageDetailCtrl', function ($rootScope, sailsResource, $location, $routeParams) {

  var self = this;
  var page = sailsResource('Page');
  // Acces to a page
  var folioUrlToTitle = $location.path().split("/");
  var folioTitle = folioUrlToTitle[1].split('_').join(' ');

  var currentPage = sailsResource('Page').get({ title: folioTitle });

  this.pageFolio = currentPage;
})
