Meteor.methods({
  '/users/update/follows': function () {
    this.unblock();
    Users.getAllFollows();
  }
});
