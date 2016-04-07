import { Component } from 'angular2/core';

@Component({
    selector: 'home',
    templateUrl: 'app/pages/home/home.html'
})

export class Home {
    constructor() {
        let vm = {};
        console.log("home...");
     }

    ngOnInit() { }

}
