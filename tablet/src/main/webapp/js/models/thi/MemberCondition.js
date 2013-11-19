MemberCondition = Backbone.Model.extend({
});

MemberConditionCollection = Backbone.Collection.extend({
    model: MemberCondition,
    url: "/memberconditions",
});
