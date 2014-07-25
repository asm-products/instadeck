Caches = new Meteor.Collection('caches');

Caches.helpers({
  user: function () {
    return InstagramAccounts.findOne({id: this.user_id});
  }
});

Caches.create = function (doc) {
  var fields = _.pick(doc, [
    'link',
    'id',
    'location',
    'tags',
    'type',
    'caption',
    'filter',
    'images',
    'user_in_photo',
    'created_time',
    'like'
  ]);

  fields = _.extend(fields, {user_id: doc.user.id});

  if (doc.videos)
    fields = _.extend(fields, {videos: doc.videos});

  var cache = Caches.findOne({id: doc.id});

  if (!cache)
    Caches.insert(fields);            
};
