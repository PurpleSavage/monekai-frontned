import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseModalComponent } from "../base-modal/base-modal.component";


export type ModalAction = 'CLOSE-DO' | 'CLOSE-CONTINUE'
@Component({
  selector: "app-warning-modal",
  templateUrl: "./warning-modal.component.html",
  imports:[BaseModalComponent],
  standalone: true,
})
export class WarningModalComponent { 
  @Input() textCloseDo: string = ""
  @Input() textCloseContinue:string=""
  @Input() title: string = "";
  @Input() message: string = "";
  @Output() accepted: EventEmitter<ModalAction> = new EventEmitter<ModalAction>()

  accept(action:ModalAction ) {
     this.accepted.emit(action);
   }
}
