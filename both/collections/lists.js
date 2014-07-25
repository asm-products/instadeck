/*
 * {
 *  user_id: Meteor
 *  name: 
 *  slug: 
 *  member_ids []
 *  keywords: []
 * }
 */

Lists = new Meteor.Collection('lists');

Lists.addMember = function (name, memberId) {
  var user = Meteor.user();
  //XXX use real slug function 
  var name = name.trim();
  var slug = name.replace(' ', '_');
  var list = Lists.findOne({name: name, user_id: user._id});
  if (!list) {
    Lists.insert({
      user_id: user._id,
      slug: slug,
      name: name,
      member_ids: [memberId]
    });
  } else {
    Lists.update({_id: list._id}, {$addToSet: {member_ids: memberId}});
  }
};

Lists.helpers({
  members: function () {
    return InstagramAccounts.find({id: {$in: this.member_ids}});
  },

  cachedFeedImages: function () {
    return Caches.find({'user_id': {$in: this.member_ids}, type: 'image'}, {sort: {created_time: -1}});
  },

  cachedFeed: function () {
    return Caches.find({'user_id': {$in: this.member_ids}}, {sort: {created_time: -1}});
  }
});
