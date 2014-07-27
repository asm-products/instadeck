/*
 * {
 *  name:
 * }
 */

HashTags = new Meteor.Collection('hash_tags');

HashTags.helpers({
  feed: function () {
    return Caches.find({tags: this.name});
  }
});
