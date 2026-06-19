import { NgClass } from "@angular/common";
import { Component, Input} from "@angular/core";

@Component({
  selector: "app-base-modal",
  templateUrl: "./base-modal.component.html",
  imports: [
    NgClass
  ],
  standalone: true,
})
export class BaseModalComponent {
  @Input() className: string = ''
  @Input() title:string =''
}
