angular.module('myApp.route', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  // ROUTES for Blog

  .when('/blog', {
    templateUrl: 'blog/blog.html',
    controller: 'BlogCtrl as post'
  })

  .when('/blog/:title', {
    templateUrl: 'blog/blogDetail.html',
    controller: 'BlogDetailCtrl as post'
  })

  // ROUTES for Admin panel

  .when('/admin', {
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  })

  .when('/admin/blog', {
    templateUrl: 'admin/admin_blog.html',
    controller: 'BlogCtrl as post'
  })

  .when('/admin/blog/new', {
    templateUrl: 'admin/admin_blogNew.html',
    controller: 'BlogCtrl as post'
  })

  .when('/admin/blog/:title', {
    templateUrl: 'admin/admin_blogEdit.html',
    controller: 'AdminBlogEditCtrl as post'
  })

  .when('/admin/pages', {
    templateUrl: 'admin/admin_pages.html',
    controller: 'PageCtrl as folio'
  })

  .when('/admin/pages/new', {
    templateUrl: 'admin/admin_pageNew.html',
    controller: 'AdminPageEditCtrl as folio'
  })

  .when('/admin/pages/:title', {
    templateUrl: 'admin/admin_pageEdit.html',
    controller: 'AdminPageEditCtrl as folio'
  })

  // ROUTES for pages

  .when('/pages', {
    templateUrl: 'page/pages.html',
    controller: 'PageCtrl as folio'
  })

  .when('/:title', {
    templateUrl: 'page/pageDetail.html',
    controller: 'PageDetailCtrl as folio'
  })

  .otherwise({redirectTo: '/blog'})
  ;
}])
