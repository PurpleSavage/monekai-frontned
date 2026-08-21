import { Component } from "@angular/core";

@Component({
  selector: 'app-buy-credits-button',
  templateUrl: './buy-credits-button.component.html',
  standalone: true
})
export class BuyCreditsButtonComponent {
  public readonly label = 'Add credits';
}
