import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { Home } from './pages/home/home';

@Component({
    selector: 'load-app',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: []
})
@RouteConfig([
    {path: '/', name: 'Home', component: Home, useAsDefault: true}
])
export class AppComponent {

    constructor() {
        console.log("app component loaded");
    }

}