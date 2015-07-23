# START
#### __HTML5__ starter kit for creating HTML5 applications and User Interfaces (UIs), intergrated with __GRUNTJS__ for fast, clean and optimised web app creation.

It has all the neccessary requirements to get anyone started in creating apps fast and easy.

To see the layout structure of the boilerplate, see [Structure.md](http://github.com/kn9ts/start/STRUCTURE.md)

## What does it do for me?
__START__ basically does the following:

1. compiles your scripts, templates, styles (both transpilation and precompilation is taken care of here)
2. lints them (checks for any syntax error)
3. notifies you about errors via console and system notifications
4. wraps the scripts and templates in common.js / AMD modules. (for build systems)
5. concatenates scripts and styles
6. generates source maps for concatenated files
7. copies assets and static files the respective required project production directory
8. shrinks the output by minifying code and optimizing images
9. monitors/watches your files for changes and updates realtime wherever relevant, reloads to reflects the changes to the browser
10. create a test and distribution/final versions of your app or UI without compromising the original code

> Concatinates all __CSS__ into app.full.css and __JS__ into app.full.js or app.full.min.js after minification. And replacing all CSS and JS tags in your html file with one tag having the stated as thier sources. In __DISTRIBUTION__ version only though.


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
```bash
$ git clone https://github.com/kn9ts/start-to-grunt name_of_your_project
```

After cloning/copying the boilerplate, please get into your project's directory/folder
```
$ cd name_of_your_project
```

__To install Grunt-CLI (Command Line) plugin/tool__
```bash
$ sudo npm install -g grunt-cli
```

__To install grunt/project dependecies__
```bash
$ npm install
```

__To install default project front-end assets/libraries eg. bootstrap, jQuery...__
__NOTE:__ This downloads CSS and JavaScript libraries that usually default in most projects nowdays. They are downloaded into the *__bower_assets__* folder that can be referenced in the HTML you are editting as you would have with any CSS and JavaScript files in your project, only that this way we give your application a good structure and files seperation.

```bash
$ bower install
```

__Note: Each of the '$' (dollar) sign denotes a step (so steps 4 in total)__

> *__Note:__ You can skip STEP 2($ sudo npm install -g grunt-cli) if you already did install the grunt command line plugin/tool in any prior project with or without any relation to this boilerplate*

This will install all the things you need for running the grunt-tasks automatically.

> *__Note:__ As stated prior. You need to have a running node.js and ruby along with npm. Please install this before setting up START in your project's directory. Ruby comes default in most systems nowdays so I believe you do have that already.*

### Finally Build and launch

Now you can start developing your site. Therefore use the __GruntJS__ defualt task _(type in your Terminal and press ENTER)_:

```bash
$ grunt
```

This will create a __test__ and __dist__ folder with a test and distribution application version in their respective folders.

#### Live Reload – Take Productivity to the Next Level
[Read Article](https://blog.openshift.com/day-7-gruntjs-livereload-take-productivity-to-the-next-level/) To learn more about Live-Reload

One of the features of the __GruntJS watch plugin__ is that it can automatically reload changes. It is very helpful if we are making markup, style and javascript changes and want to get instant feedback without pressing the browser refresh button.

To create a test and view the test version which is a compiled and cleaned up developement version of the project. So run:

```bash
$ grunt serve
```

And for the production/distribution version run (with no live-reload) since it reflects the final version of your UI/Web application:

```bash
$ grunt serve:dist
```

> __Note:__ Grunt watch will monitor any kind of changes made to the project and reflect it immediately to the browser. No need to hit refresh button anymore. The distributed version is not tied to live reload since it is emulating the final version of the product as it would have displayed on user's which does not require any live reload. When developing thus testing use the default -- __*grunt serve*__


### Yes! Just with boring old HTML (duuuuh!)
Yes, you can use the normal/old html way of writing markup. Just rename 'file_name' variable on line 63 to the name of the file you are working on. Do not add html or any extension tag whatsoever.

```
62.               file_name: 'myfilename', //eg for myfilename.html
```

### Though you could have the new girl in town: Jade Support
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

```jade
// App's dependencies(libraries) and business logics
application-engine(description="all the application's JS files fall here")
	//- Base engine, for Phonegap app, uncomment this if you are using phonegap
	//- script(type="text/javascript" src="cordova.js")
```

> *NOTE: do not __delete__ or __replace__ the config.xml file in the www folder that was generated by
__cordova create command__*

###### Requires cordova/phonegap v3.3 and above using the new CLI method for development and plugin loading

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
__Version: 1.2.0__

## License
Copyright (c) 2014 __Eugene Mutai__
Licensed under the [MIT license](http://mit-license.org/)
