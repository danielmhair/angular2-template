[![Circle CI](https://circleci.com/gh/rangle/angular2-starter.svg?style=svg)](https://circleci.com/gh/rangle/angular2-starter)

#Best way to get started

The things below are tailored mainly until Angular 2 releases their Angular CLI Officially. Once it is released, this 
will change.

##Install dependencies of Typescript, ES2016 and Angular 2
### Get Latest [NodeJS v6.2.1](http://nodejs.org) and NPM v3.9.6

NOTE: If you are having troubles with updating your NPM on windows. Go here: [npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade).

### Install main dependencies

Install the following things with NodeJS's Package Manager (you can use `npm` once you install NodeJS).

#### [Typescript](https://www.typescriptlang.org/)
Typscript will be the language you will be programming in. It is a language that is a superset of Javascript. You can program in 
javascript using Typescript, except Typescript gives you a lot of nice features and helps you to have good programming 
practices

NOTE: `-g` means to install this globally and not in your current project

```bash
npm install -g typescript
```
#### [Typings](https://github.com/typings/typings)

> Typings is the simple way to manage and install TypeScript definitions. It uses typings.json, which can resolve to 
> the Typings Registry, GitHub, NPM, Bower, HTTP and local files. Packages can use type definitions from various 
> sources and different versions, knowing they will never conflict for users.

Its just like bower or npm. A package manager for typescript.

```bash
npm install -g typings
```
#### [Webpack](https://github.com/webpack/webpack)
> Webpack is a bundler for modules. The main purpose is to bundle JavaScript files for usage in a browser, yet 
> it is also capable of transforming, bundling, or packaging just about any resource or asset.

```bash
npm install -g webpack
```

## Clone this project from GIT
```bash
git clone --depth=1 https://github.com/rangle/angular2-starter.git <project-name>
cd <project-name>
```
NOTE: `--depth=1` means to only get the last commit and not download all of the repo's history.

##Install project dependencies

Run `npm install` in order to install all the dependencies for the application to run

```bash
npm install
```
If there are errors with `npm install`, then scroll down this page and look for "Known Issues"

## Run the App

```bash
npm start
```

Go to `localhost:8080` to test the sample app. If its there, congratulations! You now have an app to begin coding in 
Typescript and Angular 2!

## Need to add this project to a repo?

First, create your repo in Git for the project

```bash
git init (in project directory)
git add .
git remote add http://github.com/<your-git-repo-url>.git
git commit -m "Initial commit"
git push -u origin master
```

### Known issues with package installations

#### SSL Certificate Chain Errors When installing packages/modules

##### npm install

NOTE: you will have to redo these things (for npm) if you update npm.

```bash
npm config set ca=""
npm config set strict-ssl false
```

##### typings install

Create `.typingsrc` and put this in there (this should be in your root)

```
rejectUnauthorized=false
```
##### bower install

Create `.bowerrc` file with this in there...

```
{
  "strict-ssl": false,
  "https-proxy": "",
  "directory": "path/to/your/libFolderWhereYouWantBowerDependenciesToBe"
}
```

#### Kerberos Errors
```bash
npm install -g kerberos@0.0.x
```

This happens a lot when you install `mongoose` and `mongodb`, but I have seen it happen in other packages. 
More information about these errors are found at: 
http://mongodb.github.io/node-mongodb-native/2.1/getting-started/installation-guide#troubleshooting

#### Visual Studio or node-gyp errors
If there are errors with `npm install` and its related to visual studio or node-gyp, ensure you have all the things needed to use [node-gyp](https://github.com/nodejs/node-gyp). 
##### Summary to get node-gyp working (mainly for Windows Users)
* Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the Default Install option.
* Install Python 2.7 (v3.x.x is not supported). Ensure that python is added to your PATH if your on windows

> ```bash
> npm config set python python2.7.
> npm config set msvs_version 2015
> ```

####Errors with `npm install oracledb` on Windows?

Cry no more! Do the following:
1. First verify that this is a valid path in your environment: `C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V140`

2. Run this command (NOT as admin)

```bash
SET VCTargetsPath="C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V140"
```

Run `npm install oracledb`. NOTE: If this doesn't work or you don't have that path, 
then install `http://landinghub.visualstudio.com/visual-cpp-build-tools`

# 
# The original README from Rangle.IO
## Angular 2/TypeScript/Webpack Starter

This is the initial version of our starter project using Angular 2.x, TypeScript and Webpack to tie it all together.

## Getting Started

Use our [starter script](http://npm.im/rangle-starter), with
`angular2-starter` as the `techStack` argument.

## npm scripts

> To see all available scripts:
```bash
$ npm run
```

### Dev
```bash
$ npm run dev
```

This runs a development mode server with live reload etc.

Open `http://localhost:8080` in your browser.

### Production

```bash
$ npm install
$ npm start
```

This runs a production-ready express server that serves up a bundled and
minified version of the client.

Open `http://localhost:8080` in your browser.

### Tests

#### Single Run (with linting and coverage)
```bash
$ npm test
# or
$ npm t
```

#### Watch Files
```bash
$ npm run test:watch
```

#### Coverage
```bash
$ npm run cover
```

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.

## Improvements

This is an initial version of this setup and will be expanded in the future. Refer to the [issues section](https://github.com/rangle/rangle-starter/issues) to see what needs to be done, or create a [new one](https://github.com/rangle/rangle-starter/issues/new).

Issues for this particular starter project are tagged with the 'ng2' label.

## If something doesn't work

We centralize issue management for all rangle starters in the [rangle-starter](https://github.com/rangle/rangle-starter) repository, to help us keep things consistent.

Refer to the [issues section](https://github.com/rangle/rangle-starter/issues) to see if this has already been logged. Otherwise create a [new issue](https://github.com/rangle/rangle-starter/issues/new).

Be sure to tag your new issue with the 'ng2' label so we can see which starter you're filing it for.


## Example Application

TBC

## License

Copyright (c) 2016 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"
