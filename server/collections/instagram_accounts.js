InstagramAccounts.allow({
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
