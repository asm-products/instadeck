/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
  subs: {
    user: Meteor.subscribe('user_info')
  }
});

//Updating cache
Deps.autorun(function () {
  if (Meteor.user()) {
    Meteor.subscribeCache('follow_accounts');

    Meteor.setInterval(function () {
      //Caches.updateUserFeed();
      Meteor.call('updateUserFeed')
    }, 90000);

    Meteor.setInterval(function () {
      Meteor.subscribeCache('follow_accounts');
      Meteor.call('getAllFollows');
    }, 43200000);
  }
});

App.helpers = {
  equals: function (a, b) {
    return a === b;
  },

  formatShortDate: function (date) {
    return date && moment(date).format('M/D/YY h:mm a');
  },

  formatUnixShortDate: function (date) {
    return date && moment.unix(date).format('M/D/YY h:mm a');
  }
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});
