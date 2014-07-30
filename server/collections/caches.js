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
    InstagramSDK.getUserFeed({
      accessToken: accessToken,
      callback: function (err, res) {
        if (err)
          throw err;
        var result = res.data;

        _.each(result.data, function (doc) {
          Caches.create(doc);
        });
      }
    });
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

  if (instagramAccount.updated_at) {
    return moment.diff(instagramAccount.updated_at, 'hours') < 1;  
  }

  try {
    var result = InstagramSDK.getRecentUserMedia(instagramId, {
      accessToken: user.services.instagram.accessToken,
      callback: function (err, res) {
        if (err)
          throw err;
        var result = res.data;
        
        _.each(result.data, function (doc) {
          Caches.create(doc);
        });

        InstagramAccounts.update({id: instagramId}, {$set: {updated_at: new Date}});
      }
    });
  } catch (e) {
    console.log(e.toString());
  }
};
