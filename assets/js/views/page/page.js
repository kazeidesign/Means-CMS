'use strict';

angular.module('myApp.page', ['ngRoute'])

.controller('PageCtrl', function ($rootScope, sailsResource) {

  var self = this;
  var page = sailsResource('Page');

  this.pageResource = page;
  this.pageForm = new page();
  this.pageTypes = page.query();

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
