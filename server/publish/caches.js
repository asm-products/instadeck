Meteor.publishCache('list', function (listId, limit, skip) {
  var list = Lists.findOne({_id: listId});

  if (!list)
    return;

  var accountsHandle = InstagramAccounts.find({id: {$in: list.member_ids}});
  var accounts = accountsHandle.fetch();
  var memberIds = _.pluck(accounts, 'id');

  var cachesHandle = Caches.find({user_id: {$in: memberIds}}, {
    sort: {created_time: -1},
    limit: limit || 0,
    skip: skip || 0
  });

  return [accountsHandle, cachesHandle];
}, {unblock: true});

Meteor.publishCache('instagram_account', function (userId, limit, skip) {
  var cachesHandle = Caches.find({user_id: userId}, {
    sort: {created_time: -1},
    limit: limit || 0,
    skip: skip || 0
  });

  return cachesHandle;
}, {unblock: true});
