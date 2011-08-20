var CommentCollection = Backbone.Collection.extend({
  model: Comment,

  forSelect: function() {
    return this.map(function(comment) {
      return [comment.get('comment'),comment.id];
    });
  }
});
