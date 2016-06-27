/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './pages';

import { BootstrapNavbarComponent, Link, RouterActive } from './components';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, BootstrapNavbarComponent ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css'),
    require('../assets/fonts/font-awesome.min.css')
  ],
  template: `
    <bootstrap-navbar [rightLinks]="rightLinks" [leftLinks]="leftLinks" [brand]="brand"></bootstrap-navbar>
    <md-content>
      <router-outlet></router-outlet>
    </md-content>
  `
})
@RouteConfig([
  { path: '/',  name: 'Home',  component: Home, useAsDefault: true },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./pages/about')('About') }
])
export class App {
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  rightLinks: Link[] = [
    new Link("Home", 'Home'),
    new Link("About", 'About')
  ];

  leftLinks: Link[] = [];

  brand: Link = new Link("Angular 2 Template", 'Home', null, "fa-dashboard");

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
