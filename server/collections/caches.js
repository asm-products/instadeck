Caches.allow({
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

Caches.updateUserFeed = function () {
  var user = Meteor.user();

  if (!user)
    return;

  var userId = user.services.instagram.id;
  var accessToken = user.services.instagram.accessToken;

  if (!accessToken)
    return;

  try {
    var result = InstagramSDK.getUserFeed({accessToken: accessToken});

    if (result.data) {
      _.each(result.data, function (doc) {
        Caches.create(doc);
      });
    }
  } catch (e) {
    console.log(e.toString());
  }
};

Caches.updateInstagramAccountFeed = function (instagramId) {
  var user = Meteor.user();
  if (! (user && user.services &&
        user.services.instagram && user.services.instagram.accessToken))
    return;

  var instagramAccount = InstagramAccounts.findOne({id: instagramId});

  if (!instagramAccount)
    return;

  try {
    var result = InstagramSDK.getRecentUserMedia(instagramId, {
      accessToken: user.services.instagram.accessToken
    });

    _.each(result.data, function (doc) {
      Caches.create(doc);
    });
  } catch (e) {
    console.log(e.toString());
  }
};
