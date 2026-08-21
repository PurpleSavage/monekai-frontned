import { Component } from "@angular/core";
import { HistoryBillingComponent } from "../../components/history-billing/history-billing.component";
import { CreditsSummaryComponent } from "../../components/credits-summary/credits-summary.component";
import { BuyCreditsButtonComponent } from "../../components/buy-credits-button/buy-credits-button.component";

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  standalone: true,
  imports: [HistoryBillingComponent, CreditsSummaryComponent, BuyCreditsButtonComponent]
})
export class PaymentsPageComponent {

}
