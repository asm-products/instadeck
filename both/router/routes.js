/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  /*
    Example:
      this.route('home', {path: '/'});
  */
  this.route('home', {path: '/'});

  this.route('list.show', {path: '/list/:slug'});
  this.route('instagram.account.show', {path: '/instagram/:id'});
});

Router.onRun(function () {
  if (analytics)
    analytics.page();
});
