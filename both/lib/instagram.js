InstagramSDK = {
  url: 'https://api.instagram.com/v1:resource',

  options: {},

  headers: function (options) {
    options = options || {};
    return _.extend({}, options.headers || {});
  },

  params: function (options) {
    options = options || {};
    return _.extend({
      access_token: options.accessToken || this.options.accessToken
    }, options.params || {});
  },

  request: function (method, resource, options) {
    var url = this.url.replace(':resource', resource);

    var httpRequestOptions = {
      params: this.params(options),
      headers: this.headers(options)
    };

    if (options.data)
      httpRequestOptions = _.extend(httpRequestOptions, {data: options.data});

    if (options.callback) {
      HTTP[method.toLowerCase()](url, httpRequestOptions, options.callback);
    } else {
      var result = HTTP[method.toLowerCase()](url, httpRequestOptions);
      if (result && result.statusCode === 200) {
        return result;
      }
      else {
        throw new Error('InstagramSDK Request Error: ', result.statusCode, result);
      }
    }
  },

  get: function (resource, options) {
    return this.request('get', resource, options);
  },

  post: function (resource, options) {
    return this.request('post', resource, options);
  },

  /**
   * Instagram APIs
   */
  getUserFollowing: function (userId, options) {
    var url = '/users/' + userId + '/follows';
    var result = this.get(url, options);
    return result.data;
  },

  getUserFeed: function (options) {
    var result = this.get('/users/self/feed', options);
    return result.data;
  },

  getRecentUserMedia: function (userId, options) {
    var url = '/users/' + userId + '/media/recent';
    var result = this.get(url, options);
    return result.data;
  },

  likeMedia: function (mediaId, options) {
    var url = '/media/' + mediaId + '/likes';
    var result = this.post(url, options);
    return result.data;
  },

  getHashtagFeed: function (name, options) {
    var url = '/tags/' + name + '/media/recent';
    var result = this.post(url, options);

    return result.data;
  }
};
