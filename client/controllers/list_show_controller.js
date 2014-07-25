ListShowController = RouteController.extend({
  data: function () {
    var slug = this.params.slug;
    var user = Meteor.user();
    if (!user)
      return;

    var list = Lists.findOne({slug: slug, user_id: user._id});

    if (list) {
      Meteor.subscribeCache('list', list._id, 50, 0);
    }

    this.skip = 0;
    return list;
  }
});
