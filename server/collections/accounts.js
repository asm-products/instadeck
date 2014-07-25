Meteor.startup(function () {
  Accounts.loginServiceConfiguration.remove({
    service: 'instagram'
  });

  Accounts.loginServiceConfiguration.insert({
    service: 'instagram',
    clientId: '2d97e617dffc4d7d9d30f5ff14057720',
    secret: 'd8fc6c62ed824c5b82a8129459dc6fec'
  });
});

Accounts.onLogin(function (loginInfo) {
  Users.getAllFollows(loginInfo.user._id);
});
