var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        thiApp.onReady();
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
