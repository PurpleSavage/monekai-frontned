import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SharedHeaderComponent } from "../../components/shared-header/shared-header.component";
import { SharedNavigatorComponent } from "../../components/shared-navigator/shared-navigator.component";

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedHeaderComponent,
    SharedNavigatorComponent,
  ]
})
export class ProtectedLayoutComponent {
  
}