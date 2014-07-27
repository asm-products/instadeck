/*
Template.Home.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var selectedUser = this;
    var user = Meteor.user();
    var input = Forms.data(e.currentTarget);

    var listNames = input.lists.split(',');

    _.each(listNames, function (name) {
      Lists.addMember(name, selectedUser.id);
    });
  }
});
*/

Template.HashTagForm.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var selectedUser = this;
    var user = Meteor.user();
    var input = Forms.data(e.currentTarget);
    if (input.name) {
      var name = input.name.replace('#', '');

      console.log(name);
      Meteor.call('/users/update/hashtags', name);
    }
  }
});

Template.UserFollowList.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var selectedUser = this;
    var user = Meteor.user();
    var input = Forms.data(e.currentTarget);

    var listNames = input.lists.split(',');

    _.each(listNames, function (name) {
      Lists.addMember(name, selectedUser.id);
    });
  }
});
