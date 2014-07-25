InstagramAccounts.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return !!userId;
  },
  remove: function (userId, doc) {
    return false;
  }
});

/*
InstagramAccounts.updateFeed = function (instagramId) {
  var user = Meteor.user();
  if (! (user && user.services &&
        user.services.instagram && user.services.instagram.accessToken))
    return;

  var instagramAccount = InstagramAccounts.findOne({id: instagramId});

  if (!instagramAccount)
    return;

  var result = InstagramSDK.getRecentUserMedia(instagramId, {
    accessToken: user.services.instagram.accessToken
  });

  _.each(result, function (doc) {
    Caches.create(doc);
  });
};
*/

InstagramAccounts.after.insert(function (userId, doc) {
  Caches.updateInstagramAccountFeed(doc.id);
});
