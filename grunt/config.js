// #Defualt grunt configuration options
'use strict';

//get package.json for some references
var pkg = require('../package');

var default_options = {
    app: {
        dist: "dist",
        dev: "app",
        test: "test", 
        banner: "/**\n *\n * @Author - Eugene Mutai\n * @Twitter - JheneKnights\n * @Email - eugenemutai@gmail.com\n *\n * Date: <% grunt.template.today('dd/mm/yyyy') %>\n * Time: <% grunt.template.today('hh:mm') %>\n * Description:" + pkg.description + "\n * Licensed under" + pkg.license.type + "(" + pkg.license.url + ")\n * Ayyee, Ayyee! Always happy to help. :) \n */\n"
    }
}
// referenced as eg. <% app.dist %>

// pass to module
module.exports = default_options;