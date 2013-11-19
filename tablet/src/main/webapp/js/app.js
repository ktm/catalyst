var THI = Application.extend({
    onReady: function() {
        this.initialize();

        router = new THIRouter();
        router.start();

        this.db = window.openDatabase("Tulasi", "1.0", "Tulasi Mobile DB", 200000);
        this.daos.memberDao = new MemberDAO(this.db);
        this.daos.memberConditionDao = new MemberConditionDAO(this.db);
        this.daos.odlDao = new ODLDAO(this.db);
    }
});

var thiApp = new THI;

Backbone.sync = function (method, model, options) {

    var dao = model.dao;

    switch (method) {
        case "read":
        if (typeof model.id != 'undefined') {
            dao.find(model, function (data) {
                options.success(data);
            });
        } else {
            dao.findAll(function (data) {
                options.success(data);
            });
        }
        break;
        case "create":
            dao.create(model, function (data) {
                options.success(data);
            });
            break;
        case "update":
            dao.update(model, function (data) {
                options.success(data);
            });
            break;
        case "delete":
            dao.destroy(model, function (data) {
                options.success(data);
            });
            break;
    }

};
