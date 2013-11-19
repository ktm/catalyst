ODLView = Backbone.View.extend({

    render:function () {
        var formString = "";
        if (this.form) {
            formString = _.template(this.form, {model : this.model});
        }

        var output = this.template({ formContent : formString, model : this.model});
        $(this.el).html( output );
        return this;
    }
});
