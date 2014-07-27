HashTagShowController = RouteController.extend({
  data: function () {
    return HashTags.find({name: this.params.name});
  }  
});
