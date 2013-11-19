MemberConditionView = Backbone.View.extend({
    render:function () {
        var output = this.template({ model : this.model});
        $(this.el).html( output );
        return this;
    }
});


