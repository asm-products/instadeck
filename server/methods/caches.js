Meteor.methods({
  'likeMedia': function (mediaId) {
    var user = Meteor.user();  
    if (!user)
      return;

    InstagramSDK.likeMedia(mediaId, {
      accessToken: user.services.instagram.accessToken
    });
  }
});
