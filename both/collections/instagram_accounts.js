InstagramAccounts = new Meteor.Collection('instagram_accounts');

InstagramAccounts.helpers({
  memberOfLists: function () {
    var user = Meteor.user();

    if (!user)
      return;
    return  Lists.find({user_id: user._id, member_ids: this.id});
  },

  cachedFeed: function () {
    return Caches.find({user_id: this.id}, {sort: {created_time: -1}});
  }
});
