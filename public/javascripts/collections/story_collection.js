var StoryCollection = Backbone.Collection.extend({
  model: Story,

  initialize: function() {
    this.bind('change:position', this.sort);
    this.bind('change:state', this.sort);
    this.bind('change:owned_by_id', this.sort);
  },

  comparator: function(story) {
    return story.position();
  },

  next: function(story) {
    return this.at(this.indexOf(story) + 1);
  },

  previous: function(story) {
    return this.at(this.indexOf(story) - 1);
  },

  // Returns all the stories in the named column, either #done, #in_progress,
  // #backlog or #chilly_bin
  column: function(column) {
    if(column == "#my_work"){
    	return this.select(function(story) {
		    console.log(story.get('owned_by_id'));
            return story.get('owned_by_id') == current_user_id
	    });
    }
      console.log(column);
    return this.select(function(story) {
      return story.column() == column;
    });
  },

  // Returns an array of the stories in a set of columns.  Pass an array
  // of the column names accepted by column().
  columns: function(columns) {
    var that = this;
    return _.flatten(_.map(columns, function(column) {
      return that.column(column);
    }));
  }
});
