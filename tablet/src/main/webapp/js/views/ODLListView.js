ODLListView = Backbone.View.extend({

    render:function () {
        var output;

        if (this.options.member) {
            output = this.template({ odls : this.model.models, member: this.options.member});
        } else {
            output = this.template({ odls : this.model.models, member: null});
        }
        $(this.el).html( output );
        return this;
    }

});
