Caches.updateUserFeed = function () {
  var user = Meteor.user();

  if (! (user && user.services &&
        user.services.instagram && user.services.instagram.accessToken))
    return;

  var updateCache = function (result) {
    try {
      if (result.data) {
        console.log('updating');
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

          fields = _.extend(fields, {user_id: doc.user.id});

         if (doc.videos)
            fields = _.extend(fields, {videos: doc.videos});

         var cache = Caches.findOne({id: doc.id});

         if (cache)
          Caches.update({_id: cache._id}, {$set: fields});            
         else
           Caches.insert(fields);
        });
      }
    } catch (e) {
      console.log(e.toString());
    }
  };

  $.ajax({
    url: 'https://api.instagram.com/v1/users/self/feed?callback=?',
    dataType: 'json',
    data: {
      access_token: user.services.instagram.accessToken
    },
    success: updateCache,
    statusCode: {
      500: function () {
        alert('Sorry, service is temporarily down.');
      }
    }
  });
};
