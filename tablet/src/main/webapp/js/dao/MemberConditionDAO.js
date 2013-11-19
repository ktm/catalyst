MemberConditionDAO = function (db) {
    this.db = db;
    this.initialize(db);
};

_.extend(window.MemberConditionDAO.prototype, {

    findAll:function (callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT id, member_id, displayName, description from member_condition";
                tx.executeSql(sql, null, function(tx, results) {
                    var len = results.rows.length;
                    var conditions = [];
                    var i = 0;
                    for (; i < len; i = i + 1) {
                        conditions[i] = results.rows.item(i);
                    }
                    callback(conditions);
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
        console.log("finding member_condition for : " + model.id);
        this.db.transaction(
            function(tx) {
                var sql = "SELECT id, member_id, displayName, description from member_condition where member_id=?";
                tx.executeSql(sql, [model.id], function(tx, results) {
                    var len = results.rows.length;
                    var conditions = [];
                    var i = 0;
                    for (; i < len; i = i + 1) {
                        conditions[i] = results.rows.item(i);
                    }
                    callback(conditions);
                });
            },
            function(tx, error) {
                alert("Transaction Error: " + error);
            }
        );
    },
    initialize:function() {
        var self = this;
        this.db.transaction(
            function (tx) {
                var sql = "DROP TABLE IF EXISTS member_condition";
                tx.executeSql(sql, null,
                              function () {
                                  console.log('MemberConditionDAO.dropTable success');
                                  self.createDB();
                              },
                              function (tx, error) {
                                  alert('Drop member table error: ' + error.message);
                                  self.createDB();
                              });
            });
    },
    createDB:function(){
        var self = this;
        this.db.transaction(
            function (tx) {
            var sql = "CREATE TABLE IF NOT EXISTS member_condition ( " +
                "id INTEGER PRIMARY KEY ASC, " +
                "member_id INTEGER, " +
                "displayName TEXT, " +
                "description TEXT, " +
                "lastStat INTEGER, " +
                "lastStatTimeUTC INTEGER)";
            tx.executeSql(sql, null,
                function () {
                    console.log('MemberConditionDAO.createDB success');
                    self.loadData();
                },
                function (tx, error) {
                    alert('MemberConditionDAO.createDB error: ' + error.message);
                });
        });
    },
    loadData:function() {
        this.db.transaction(
            function (tx) {
                var sql = "insert into member_condition(id, member_id, displayName, description) values(?,?,?,?)";
                tx.executeSql(sql, [2, 0, 'Inadequate nutrition','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'],
                              function () {
                                  console.log('MemberConditionDAO.loadData success');
                              },
                              function (tx, error) {
                                  alert('MemberConditionDAO.loadData error: ' + error.message);
                              });
                tx.executeSql(sql, [0, 0, 'Maternity - 6.5 months','Nothing of note']);
                tx.executeSql(sql, [1, 0, 'Diabetes','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.']);
            });
    }
});
