Meteor.methods({
  'updateListFeed': function (listId) {
    this.unblock();
    Lists.updateFeed(listId);
  }
});
