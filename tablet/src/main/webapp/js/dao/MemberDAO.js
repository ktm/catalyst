MemberDAO = function (db) {
    this.db = db;
    this.initialize(db);
};

_.extend(window.MemberDAO.prototype, {

    findAll:function (callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT id, displayName, location, age, sex, weight, height, picture from member";
                tx.executeSql(sql, null, function(tx, results) {
                    var len = results.rows.length;
                    var members = [];
                    var i = 0;
                    for (; i < len; i = i + 1) {
                        members[i] = results.rows.item(i);
                    }
                    callback(members);
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
                var sql = "DROP TABLE IF EXISTS member";
                tx.executeSql(sql, null,
                              function () {
                                  console.log('MemberDAO.dropTable success');
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
            var sql = "CREATE TABLE IF NOT EXISTS member ( " +
                "id INTEGER PRIMARY KEY ASC, " +
                "displayName TEXT, " +
                "location TEXT, " +
                "age TEXT, " +
                "sex TEXT, " +
                "weight TEXT, " +
                "height TEXT, " +
                "picture TEXT, " +
                "lastStat INTEGER, " +
                "lastStatTimeUTC INTEGER)";
            tx.executeSql(sql, null,
                function () {
                    console.log('Create member table success');
                    self.loadData();
                },
                function (tx, error) {
                    alert('Create member table error: ' + error.message);
                });
        });
    },
    loadData:function() {
        this.db.transaction(
            function (tx) {
                var sql = "insert into member(id, displayName, location, age, sex, weight, height) values(?,?,?,?,?,?,?)";
                tx.executeSql(sql, [0, 'Kit McCormick','Lakestone','39', 'M', '210lb', '185cm'],
                    function () {
                        console.log('MemberDAO.loadData success');
                    },
                    function (tx, error) {
                        alert('MemberDAO.loadData error: ' + error.message);
                    });
            });
    }
});
