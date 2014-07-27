HashTags.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false;
  }
});
