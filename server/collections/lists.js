Lists.allow({
  insert: function (userId, doc) {
    return userId === doc.user_id; 
  },
  update: function (userId, doc, fieldNames, modifier) {
    return userId === doc.user_id;
  },
  remove: function (userId, doc) {
    return userId === doc.user_id;
  }
});

Lists.after.insert(function (userId, doc) {
  //Lists.updateFeed(doc._id);
});


Lists.updateFeed = function (listId) {
  var list = Lists.findOne({_id: listId});

  if (!list)
    return;

  var user = Users.findOne({_id: list.user_id});

  if (! (user && user.services &&
        user.services.instagram && user.services.instagram.accessToken))
    return;

  try {
    _.each(list.member_ids, function (id) {
      var result = InstagramSDK.getRecentUserMedia(id, {
        accessToken: user.services.instagram.accessToken
      });

      if (result.data) {
        _.each(result.data, function (doc) {
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

          fields = _.extend(fields, {
            user_id: doc.user.id
          });

          if (doc.videos) {
            fields = _.extend(fields, {
              videos: doc.videos
            });
          }

          Caches.upsert({id: doc.id}, {$set: fields});            
        });
      }
    });

    console.log('finish update feed, now update time', list.name);
    Lists.update({_id: list._id}, {$set: {updated_at: new Date}});
  } catch (e) {
    console.log(e.toString());
  }
};
