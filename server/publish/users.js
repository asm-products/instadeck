Meteor.publish('user_info', function () {
  if (! this.userId)
    return this.ready();

  var userHandle = Users.find({_id: this.userId});
  var listHandle = Lists.find({user_id: this.userId});

  return [userHandle, listHandle];
});

Meteor.publishCache('follow_accounts', function () {
  var user = Meteor.user();

  if (!user)
    return;

  return InstagramAccounts.find({id: {$in: user.follows}});
}, {unblock: true});
