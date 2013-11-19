Member = Backbone.Model.extend({
    defaults: {"picture":"img/nophoto.jpg"}
});

MemberCollection = Backbone.Collection.extend({
    model: Member,
    url: "/members",
});
