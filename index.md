---
layout: page
title: How to use it.
---

## Dependencies
You will need to install some stuff, if you haven't already:

Majors:

* Node.js - [Click here](http://nodejs.org) to install

Secondaries(click for further information):

* npm (installed together with node.js, usually bundled in it)
* [gruntjs](http://gruntjs.com) (part of the instructions below)
* [bower](http://bower.io)

## Getting Started

Once you have NodeJS installed, run_(type/copy paste int the command line window and press ENTER)_:

__To download the boilerplate__
{% highlight bash %}
$ git clone https://github.com/jheneknights/knightstart name_of_your_project
{% endhighlight %}

After cloning/copying the boilerplate, please get into your project's directory/folder
{% highlight bash %}
$ cd name_of_your_project
{% endhighlight %}

__To install Grunt-CLI (Command Line) plugin/tool__
{% highlight bash %}
$ sudo npm install -g grunt-cli
{% endhighlight %}

__To install grunt/project dependecies__
{% highlight bash %}
$ npm install
{% endhighlight %}

__To install default project front-end assets/libraries eg. bootstrap, jQuery...__

> __NOTE:__ This downloads CSS and JavaScript libraries that usually default in most projects nowdays. They are downloaded into the *__bower_assets__* folder that can be referenced in the HTML you are editting as you would have with any CSS and JavaScript files in your project, only that this way we give your application a good structure and files seperation.

{% highlight bash %}
$ bower install
{% endhighlight %}

__Note: Each of the '$' (dollar) sign denotes a step (so steps 4 in total)__

> *__Note:__ You can skip STEP 2($ sudo npm install -g grunt-cli) if you already did install the grunt command line plugin/tool in any prior project with or without any relation to this boilerplate*

This will install all the things you need for running the grunt-tasks automatically.

> *__Note:__ As stated prior. You need to have a running node.js and ruby along with npm. Please install this before setting up KnightStart in your project's directory. Ruby comes default in most systems nowdays so I believe you do have that already.*

### Finally Build and launch

Now you can start developing your site. Therefore use the __GruntJS__ defualt task _(type in your Terminal and press ENTER)_:

{% highlight bash %}
$ grunt
{% endhighlight %}

This will create a __test__ and __dist__ folder with a test and distribution application version in their respective folders.

### Live Reload – Take Productivity to the Next Level

[Read Article](https://blog.openshift.com/day-7-gruntjs-livereload-take-productivity-to-the-next-level/) To learn more about Live-Reload

One of the features of the __GruntJS watch plugin__ is that it can automatically reload changes. It is very helpful if we are making markup, style and javascript changes and want to get instant feedback without pressing the browser refresh button.

To create a test and view the test version which is a compiled and cleaned up developement version of the project. So run:

{% highlight bash %}
$ grunt serve
{% endhighlight %}

And for the production/distribution version run (with no live-reload) since it reflects the final version of your UI/Web application:

{% highlight bash %}
$ grunt serve:dist
{% endhighlight %}

> __Note:__ Grunt watch will monitor any kind of changes made to the project and reflect it immediately to the browser. No need to hit refresh button anymore. The distributed version is not tied to live reload since it is emulating the final version of the product as it would have displayed on user's which does not require any live reload. When developing thus testing use the default -- __*grunt serve*__


### Yes! Just with boring old HTML (duuuuh!)

Yes, you can use the normal/old html way of writing markup. Just rename 'file_name' variable on line 63 to the name of the file you are working on. Do not add html or any extension tag whatsoever.

{% highlight javascript %}
file_name: 'myfilename', //eg for myfilename.html
{% endhighlight %}

### Jade Support
#### The new girl in town

But you should __STOP__ WRITTING TIRESOME HTML. You do get tired opening and closing tags, dont you?! Jade fastens front-end developement by at least 5 times. Try [Jade](http://jade-lang.com) today.

It is supported off the box. No need to configure anything. Start writing JADE today. Chuck your phone and come with up a _'am leaving you'_ message for HTML.

## Browser support
* Chrome
* Firefox 4+
* Internet Explorer 8+
* Opera 12+
* Safari 5+

## Cordova applications

It's also awesome for cordova applications:
* replace the __www__ folder content with this
* and uncomment the 1st script..

{% highlight jade %}
// App's dependencies(libraries) and business logics
application-engine(description="all the application's JS files fall here")
    //- Base engine, for Phonegap app, uncomment this if you are using phonegap
    //- script(type="text/javascript" src="cordova.js")
{% endhighlight %}

> __*NOTE:__ do not __delete__ or __replace__ the config.xml file in the www folder that was generated by
__cordova create command__*

> __*NOTE:__ Requires cordova/phonegap v3.3 and above using the new CLI method for development and plugin loading