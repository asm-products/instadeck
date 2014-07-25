Template.FeedList.events({
  'click .load-more': function () {
    var list = this;

    var currentRoute = Router.current();
    currentRoute.skip +=50;
    var skip = currentRoute.skip;

    Meteor.subscribeCache('list', list._id, 50, skip);
  },

  'click .like': function (e, tmpl) {
    e.preventDefault();
    console.log(this);
    Meteor.call('/caches/like/media', this.id);
  }
});
