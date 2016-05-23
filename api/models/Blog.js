/**
 * Blog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    post: {
      type: 'text'
    },
    image: {
      type: 'string'
    },
    tags: {
      collection: 'tag',
      via: 'posts',
      dominant: true
    },
    comments: {
      collection: 'comment',
      via: 'comment'
    }
  }
};

