//Install node.js, navigate to the js folder, and then run this command: "node r.js -o app.build.js"
({

  // Creates a js-optimized folder at the same folder level as your "js" folder and places the optimized project there
  dir: "../js-optimized",

  // 3rd party script alias names
  paths: {

    // Core Libraries
    jquery: "libs/jquery/jquery-min",
    underscore: "libs/underscore/underscore-min",
    backbone: "libs/backbone/backbone-min",

    // Require.js Plugins
    text: "libs/require/text"

  },

})
