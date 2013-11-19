MemberODLView = Backbone.View.extend({
   events: {
        "click .save"     : "save",
    },
    render:function () {
        var formString = "";
        if (this.options.form) {
            formString = _.template(this.options.form, {model : this.model});
        }

        var output = this.template({ member : this.options.member, formContent : formString, odl: this.model});
        $(this.el).html( output );
        return this;
    },
    save:function () {
        var allInputs = $(":input");

        for (var i = 0; i < allInputs.length; i++) {
            alert(allInputs[i].id + ": " + allInputs[i].value);
        }

        alert("Member Id:" + this.options.member.get("id"));
        alert("Form Id:" + this.model.get("id"));

        return false;
    }
});
