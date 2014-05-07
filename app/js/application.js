/**
 *
 * @Author - Eugene Mutai
 * @Twitter - JheneKnights
 * @Email - eugenemutai@gmail.com
 *
 * Date: 11/10/13
 * Time: 2:06 PM
 * Description: All your applications business logic should fall in here
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Copyright (C) 2014
 * @Version -
 */

var app = {
    // Application Constructor
    initialize: function() {
        app.init();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    init: function() {
        document.addEventListener('deviceready', app.deviceready, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'prepareFunctions'
    // function, we must explicity call 'app.prepareFunctions(...);'
    deviceready: function() {
        app.prepareFunctions('deviceready');
    },
    prepareFunctions: function(param) {
        //prepare these functions to do something (event binding, initialise etc...)
        //leave following function as last to run the stuff in the function after app preparations
        //eg. check user sign up or something
        app.doFunctions();
    },
    doFunctions: function() {
        //do something (check if user is already signed in, check for internet connection, resize app e.t.c)
    },
    /** 
     * LOCAL STORAGE MANAGEMENT FUNCTION 
     * @param options - local(bool), content(object), backup(bool)
     * @param key
     * STORE CONTENT locally or in cookie or BOTH
     *
     * HOW TO USE: 
         app.localStorage('key') //Returns the content if existing, or false if it doesnt
         app.localStorage('key', {
            content: the content, can be a raw object, string or raw array //it is stringified by the function
            local: true/false //yes or no if you want to store only in localStorage
         })
     */
    localStorage: function(key, options) {
        if (options) { //store this data
            if (!options.local) {
                localStorage.setItem(key, JSON.stringify(options.content));
            } else { //also in cookie too
                if ($.cookie) $.cookie(key, options.content);
                localStorage.setItem(key, JSON.stringify(options.content));
            }
        } else if (options === false) { //if options == false
            localStorage.removeItem(key);
            if ($.cookie) $.cookie(key, false); //remove everything
        }

        //if only one argument is given retrieve that data from localstorage
        return arguments.length == 1 ? JSON.parse(localStorage.getItem(key)) : false;
    }
};