Template.ListShow.events({
  'click .delete-list': function (e, tmpl) {
    e.preventDefault();
    var list = this;
    console.log(list);
    if (confirm('delete?')) {
      Lists.remove({_id: list._id}, function (err) {
        if (err)
          throw err;
        else
          Router.go('home');
      });
    }  
  },

  'click .remove-from-list': function (e, tmpl) {
    e.preventDefault();
    var member = this;
    var list = tmpl.data;

    Lists.update({_id: list._id}, {$pull: {member_ids: member.id}});
  }
});
