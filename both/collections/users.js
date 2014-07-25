/*
 * {
 *  follows: []
 * }
 */

Users = Meteor.users;

Users.helpers({
  follows_accounts: function () {
    return InstagramAccounts.find({id: {$in: this.follows}});
  },
  lists: function () {
    return Lists.find({user_id: this._id});
  },

  cachedSelfMedia: function () {
    return Caches.find({id: this.services.instagram.id}, {sort: {created_time: -1}});
  },

  cachedFeed: function () {
    return Caches.find({'user.id': {$in: this.follows}}, {sort: {created_time: -1}});
  }
});
