MemberListView = Backbone.View.extend({

    render:function () {
        var output = this.template({ members : this.model.models});
        $(this.el).html( output );
        return this;
    }

});
