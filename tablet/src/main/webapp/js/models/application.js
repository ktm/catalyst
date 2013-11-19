Application = Backbone.Model.extend({
    initialize: function () {
        this.router = {};
        this.models = {};
        this.views = {};
        this.templates = {};
        this.daos = {};
    },

    loadTemplates: function (names, callback) {
        var deferreds = [],
        self = this;
        $.each(names, function (index, name) {
            deferreds.push($.get('tpl/' + name + '.html', function (data) {
                self.templates[name] = data;
            }));
        });
        $.when.apply(null, deferreds).done(callback);
    },

    getTemplate: function(name) {
        return this.templates[name];
    }

});
