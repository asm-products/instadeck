var isEditing = function (id) {
  return Session.equals('isEditing-' + id, true);
};

var setEditing = function (id, isEditing) {
  Session.set('isEditing-' + id, isEditing);
};
Template.InlineEditor.helpers({
  isEditing: function () {
    var item = this;
    return isEditing(item._id);
  }
});

Template.InlineEditor.events({
  'click .edit': function (e, tmpl) {
    var item = this;
    setEditing(item._id, true);
  },
  'click .cancel': function (e, tmpl) {
    var item = this;
    setEditing(item._id, false);
  }
});
