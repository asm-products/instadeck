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
