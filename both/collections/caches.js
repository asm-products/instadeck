Caches = new Meteor.Collection('caches');

Caches.helpers({
  user: function () {
    return InstagramAccounts.findOne({id: this.user_id});
  }
});
