THIRouter = Backbone.Router.extend({
   routes: {
       ""                                 : "home",
       "member/:idx"                      : "member",
       "members"                          : "members",
       "memberconditions/:memberidx"      : "memberconditions",
       "odlform/:memberidx/:odlidx"       : "memberodl",
       "odlform/:idx"                     : "odlform",
       "odlform"                          : "clearodlform",
       "memberodls/:memberidx"            : "memberodls",
       "odls"                             : "odls"
   },

   start: function() {
      thiApp.loadTemplates(['HomeView', 'MemberListView', 'MemberView', 'MemberConditionView', 'MemberODLView', 'ODLView', 'ODLListView', 'MemberODLListView'], function () {
         Backbone.history.start();
      });
   },

    home: function (id) {
        if (!thiApp.views.homeView) {
            thiApp.views.homeView = new HomeView();
            thiApp.views.homeView.template = _.template(thiApp.getTemplate('HomeView'));
            thiApp.views.homeView.render();
        }
        $('#content').html(thiApp.views.homeView.el);
    },

    members: function() {
        this.loadMembers(function () {
            thiApp.views.memberListView = new MemberListView({model:thiApp.models.memberCollection});
            thiApp.views.memberListView.template = _.template(thiApp.getTemplate('MemberListView'));
            thiApp.views.memberListView.render();
            $('#content').html(thiApp.views.memberListView.el);
        });
    },

    member: function(memberid) {
        thiApp.models.currentMember = thiApp.models.memberCollection.models[memberid];
        thiApp.views.memberView = new MemberView({model:thiApp.models.currentMember});
        thiApp.views.memberView.template = _.template(thiApp.getTemplate('MemberView'));
        thiApp.views.memberView.render();
        $('#content').html(thiApp.views.memberView.el);
    },

    memberconditions: function(memberid) {
        thiApp.models.currentMember = thiApp.models.memberCollection.models[memberid];
        this.loadMemberConditions(thiApp.models.currentMember, function () {
            thiApp.views.memberConditionView = new MemberConditionView({model:thiApp.models.currentMember});
            thiApp.views.memberConditionView.template = _.template(thiApp.getTemplate('MemberConditionView'));
            thiApp.views.memberConditionView.render();
            $('#content').html(thiApp.views.memberConditionView.el);
        });
    },

    odlform: function (formid) {
        thiApp.views.odlView = new ODLView({model:thiApp.models.odlCollection.models[formid]});
        thiApp.views.odlView.form = thiApp.models.odlCollection.models[formid].get('form');
        thiApp.views.odlView.template = _.template(thiApp.getTemplate('ODLView'));
        thiApp.views.odlView.render();

        $('#content').html(thiApp.views.odlView.el);
    },

    memberodl: function (memberidx, formidx) {
        thiApp.models.currentMember = thiApp.models.memberCollection.models[memberidx];
        thiApp.views.memberOdlView = new MemberODLView({model:thiApp.models.odlCollection.models[formidx], 
                                                        member:thiApp.models.currentMember,
                                                        form:thiApp.models.odlCollection.models[formidx].get('form')});
        thiApp.views.memberOdlView.template = _.template(thiApp.getTemplate('MemberODLView'));
        thiApp.views.memberOdlView.render();

        $('#content').html(thiApp.views.memberOdlView.el);
    },

    memberodls: function(memberidx) {
        thiApp.models.currentMember = thiApp.models.memberCollection.models[memberidx];
        this.loadODLs(function () {
            thiApp.views.odlListView = new ODLListView({model:thiApp.models.odlCollection, member:thiApp.models.currentMember});
            thiApp.views.odlListView.template = _.template(thiApp.getTemplate('MemberODLListView'));
            thiApp.views.odlListView.render();
            $('#content').html(thiApp.views.odlListView.el);
        });
    },

    odls: function() {
        this.loadODLs(function () {
            thiApp.views.odlListView = new ODLListView({model:thiApp.models.odlCollection});
            thiApp.views.odlListView.template = _.template(thiApp.getTemplate('ODLListView'));
            thiApp.views.odlListView.render();
            $('#content').html(thiApp.views.odlListView.el);
        });
    },

    clearodlform: function () {
        thiApp.views.odlView.template = _.template(thiApp.getTemplate('ODLView'));
        thiApp.views.odlView.form = "";
        thiApp.views.odlView.render();
        $('#content').html(thiApp.views.odlView.el);
    },
    loadMembers:function (callback) {
        if (thiApp.models.memberCollection) {
            callback();
        } else {
            thiApp.models.memberCollection = new MemberCollection();
            thiApp.models.memberCollection.dao = thiApp.daos.memberDao;
            thiApp.models.memberCollection.fetch({success:function () {
                callback();
            }});
        }
    },
    loadODLs:function (callback) {
        if (thiApp.models.odlCollection) {
            callback();
        } else {
            thiApp.models.odlCollection = new ODLCollection();
            thiApp.models.odlCollection.dao = thiApp.daos.odlDao;
            thiApp.models.odlCollection.fetch({success:function () {
                callback();
            }});
        }
    },
    loadMemberConditions:function (model, callback) {
        if (model.conditions) {
            callback();
        } else {
            model.conditionCollection = new MemberConditionCollection();
            model.conditionCollection.id= model.get("id");
            model.conditionCollection.dao = thiApp.daos.memberConditionDao;
            model.conditionCollection.fetch({success:function () {
                callback();
            }});
        }
    }
});
