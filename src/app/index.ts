// App
export * from './app.component';
export * from './app.service';

import { ROUTER_DIRECTIVES } from "@angular/router";
import { AppState } from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState, ROUTER_DIRECTIVES
];
