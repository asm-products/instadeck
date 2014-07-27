Meteor.methods({
  '/users/update/follows': function () {
    this.unblock();
    Users.getAllFollows();
  },

  '/users/update/hashtags': function (name) {
    console.log('updating hashtag', name, Meteor.userId());
    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {saved_hashtags: name}});

    HashTags.upsert({name: name}, {$set: {name: name}});
  }
});
