angular.module('myApp.comment', [])

.component('commentAssociate', {
  bindings: {
    associate: '@'
  },
  controller: 'commentDetailCtrl',
  templateUrl : 'components/cp_comment.html'
})

.controller('commentDetailCtrl', function ($rootScope, sailsResource, $element, $attrs) {

  var self = this;
  var comment = sailsResource('Comment');

  this.commentResource = comment;
  this.commentForm = new comment();
  this.commentTypes = comment.query();

  this.add = function () {
    self.commentForm.comment = this.associate;
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
