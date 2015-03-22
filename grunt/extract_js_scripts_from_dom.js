/**
 *
 * @Author - Eugene Mutai
 * @Twitter - JheneKnights
 * @Email - eugenemutai@gmail.com
 *
 * Date: 06/04/14
 * Time: 9:25 PM
 * Description: Script to use to get all JS and CSS files your application page is using
 * Licensed under MIT (https://github.com/jheneknights/knightstart/blob/master/LICENSE-MIT)
 */

// Get all the JS scripts in the page for GRUNTFILE addition
// Add it to your application html page or copy and paste into the browser console and run[press ENTER]
// <script src="grunt/gruntconfig_assets.js"></script>

$(function() {
    $(window).on('load', function() {
        //get the JS files
        var scripts = $('html').find('script').map(function(a, b) {
            if ($(b).attr('src')) return $(b).attr('src');
        }).map(function(a,b) {
        	if(typeof b == "string") return b;
        });
        console.log("JS scripts: -- ", scripts);

        // get the CSS Files
        var cssfile = $('html').find('link').map(function(a, b) {
            if ($(b).attr('href')) return $(b).attr('href');
        }).map(function(a,b) {
        	if(typeof b == "string") return b;
        });
        console.log("CSS styles: -- ", cssfile);
    });
})