require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    d3: 'libs/d3/d3.v2.min',

    // Require.js plugins
    text: 'libs/require/text',
    order: 'libs/require/order',
    templates: '../templates'
  }
});

// Let's kick off the application
require([
  'app'
], function(App){
  App.initialize();
});
