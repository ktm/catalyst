ODLDAO = function (db) {
    this.db = db;
    this.initialize(db);
};

_.extend(window.ODLDAO.prototype, {

    findAll:function (callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT id, displayName, form, version from odl";
                tx.executeSql(sql, null, function(tx, results) {
                    var len = results.rows.length;
                    var odls = [];
                    var i = 0;
                    for (; i < len; i = i + 1) {
                        odls[i] = results.rows.item(i);
                    }
                    callback(odls);
                });
            },
            function(tx, error) {
                alert("Transaction Error: " + error);
            }
        );
    },

    create:function (model, callback) {
//        TODO: Implement
    },

    update:function (model, callback) {
//        TODO: Implement
    },

    destroy:function (model, callback) {
//        TODO: Implement
    },

    find:function (model, callback) {
//        TODO: Implement
    },
    initialize:function() {
        var self = this;
        this.db.transaction(
            function (tx) {
                var sql = "DROP TABLE IF EXISTS odl";
                tx.executeSql(sql, null,
                              function () {
                                  console.log('ODLDAO.dropTable success');
                                  self.createDB();
                              },
                              function (tx, error) {
                                  alert('Drop odl table error: ' + error.message);
                                  self.createDB();
                              });
            });
    },
    createDB:function(){
        var self = this;
        this.db.transaction(
            function (tx) {
                var sql = "CREATE TABLE IF NOT EXISTS odl ( " +
                    "id INTEGER PRIMARY KEY ASC, " +
                    "displayName TEXT, " +
                    "version INTEGER, " +
                    "form TEXT, " +
                    "lastStat INTEGER, " +
                    "lastStatTimeUTC INTEGER)";
                tx.executeSql(sql, null,
                    function () {
                        console.log('ODLDAO.createDB success');
                        self.loadData();
                    },
                    function (tx, error) {
                        alert('Create ODL table error: ' + error.message);
                    });
            });
    },
    loadData:function() {
        this.db.transaction(
            function (tx) {
                var sql = "insert into odl(displayName, version, form) values(?,?,?)";
                tx.executeSql(sql, ['Blood Pressure',1,'<div><input id="systolic" style="font-size: 18pt; width=50%" type="number" min="0" max="500" placeholder="Systolic"> / <input id="diastolic" style="font-size: 18pt" type="number" min="0" max="500" placeholder="Diastolic"><br/><input id="pulse" style="font-size: 18pt" type="number" min="0" max="500" placeholder="Pulse"></div><div>Remarks:<br/><textarea id="remarks" style="font-size: 18pt" name="remarks" rows="6"></textarea></div>'],
                    function () {
                        console.log('ODLDAO.loadData success');
                    },
                    function (tx, error) {
                        alert('ODLDAO.loadData error: ' + error.message);
                    });
            });
    }
});

