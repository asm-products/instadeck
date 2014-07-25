Meteor.publish('all', function () {
  var list = Lists.find();
  var accounts = InstagramAccounts.find();
  var caches = Caches.find();

  return [list, accounts, caches];
});
