InstagramAccountShowController = RouteController.extend({
  data: function () {
    Meteor.subscribeCache('instagram_account', this.params.id);

    return InstagramAccounts.findOne({id: this.params.id});
  },
  onRun: function () {
    Meteor.call('/caches/update/instagram_account_feed', this.params.id);
  }
});
