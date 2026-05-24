import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-shared-navigator',
  templateUrl: './shared-navigator.component.html',
  imports: [RouterLinkActive, RouterLink],
  standalone:true
})
export class SharedNavigatorComponent {}
