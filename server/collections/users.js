Users.getAllFollows = function (userId) {
  var user = Users.findOne({_id: userId}) || Meteor.user();

  if (!user)
    return;

  var userId = user.services.instagram.id;
  var accessToken = user.services.instagram.accessToken;
  var updatedFollowList = [];

  var gettingFollower = function (userId, accessToken, nextCursor) {
    var doc = {accessToken: accessToken};

    if (nextCursor)
      doc = _.extend(doc, {params: {cursor: nextCursor}});

    try {
      var result = InstagramSDK.getUserFollowing(userId, doc);

      if (result.data) {
        var data = result.data;
        var ids = _.pluck(data, 'id');
        ids = _.toArray(ids);

        updatedFollowList.push(ids);
        _.each(result.data, function (doc) {
          InstagramAccounts.upsert({id: doc.id}, {$set: doc});            
        });
      }

      if (result.pagination && result.pagination.next_cursor) {
        gettingFollower(userId, accessToken, result.pagination.next_cursor);
      } else {
        return;
      }
    } catch (e) {
      console.log(e.toString());
      return e;
    }
  };

  gettingFollower(userId, accessToken);

  updatedFollowList = _.chain(updatedFollowList).flatten().uniq()
    .compact().value();

  Users.update({_id: user._id}, {$set: {follows: updatedFollowList}});
};
