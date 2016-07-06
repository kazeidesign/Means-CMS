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

  var currentBlogPost = sailsResource('Blog').get({ title: postTitle }, function(data) {
    var title = data.title;
    var post = data.post;
    var image = data.image;
    var comment = data.comment
    var id = data.id;

    const blogPostDetail = {
    'title' : data.title,
    'post' : data.post,
    'image' : data.image,
    'comment' : data.comment,
    'id' : data.id
    };

    console.log(blogPostDetail['title'] + ', ' + blogPostDetail['post'] + ', ' + blogPostDetail['image'] + ', ' + blogPostDetail['comment'] + ', ' + blogPostDetail['id']);
  });




  this.blogPost = currentBlogPost;

})

.controller('CommentCtrl', function ($rootScope, sailsResource) {

  var self = this;
  var comment = sailsResource('Comment');

  this.commentResource = comment;
  this.commentForm = new comment();
  this.commentTypes = comment.query();

  // console.log('comment 2.6');


    // var currentPostId = $rootScope.currentPost.id;
    // console.log('currentPostId is ' + currentPostId);

  this.add = function () {
    // comment.reply.commentForm.comment = currentPostId;
    self.commentForm.$save(function (newcomment) {
      self.commentTypes.push(newcomment);
    });
    self.commentForm = new comment();
  };

  this.cancel = function () {
    self.commentForm = new comment();
  };

  this.deleteComment = function (comment) {
    comment.$delete();
  };

  this.editComment = function (comment) {
    comment.$editing = true;
  };

  this.saveComment = function (comment) {
    comment.$save();
    comment.$editing = false;
  };

  this.causeError = function () {
    comment.notFound(
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
