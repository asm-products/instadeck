/*
 * {
 *  follows: []
 * }
 */

Users = Meteor.users;

Users.helpers({
  follows_accounts: function () {
    if (_.isArray(this.follows)) {
      return InstagramAccounts.find({id: {$in: this.follows}});
    } else {
      return;
    }
  },
  lists: function () {
    return Lists.find({user_id: this._id});
  },

  cachedSelfMedia: function () {
    return Caches.find({id: this.services.instagram.id}, {sort: {created_time: -1}});
  },

  cachedFeed: function () {
    if (_.isArray(this.follows)) {
      return Caches.find({'user.id': {$in: this.follows}}, {sort: {created_time: -1}});
    } else {
      return;
    }
  }
});
