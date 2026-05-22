import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    templateUrl:'./auth-layout.component.html',
    imports:[
        RouterOutlet,
    ],
    selector: 'app-auth-layout',
    standalone: true,
})
export class AuthLayoutComponent{}