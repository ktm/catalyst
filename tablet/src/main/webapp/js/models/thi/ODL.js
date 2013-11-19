ODL = Backbone.Model.extend({
});

ODLCollection = Backbone.Collection.extend({
    model: ODL,
    url: "/odls",
});
