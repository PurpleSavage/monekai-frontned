import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseModalComponent } from "../base-modal/base-modal.component";



export const ModalAction = {
  CLOSE_DO: 'CLOSE-DO',
  CLOSE_CONTINUE: 'CLOSE-CONTINUE',
} as const 
export type ModalActionType = typeof ModalAction[keyof typeof ModalAction]
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
  @Output() accepted: EventEmitter<ModalActionType> = new EventEmitter<ModalActionType>()

  accept(action:ModalActionType ) {
     this.accepted.emit(action);
   }
}
