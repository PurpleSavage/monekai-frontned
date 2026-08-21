import { Component } from "@angular/core";
import { CreditsSummaryDTO } from "../../../application/dtos/responses/credits-summary.dto";

@Component({
  selector: 'app-credits-summary',
  templateUrl: './credits-summary.component.html',
  standalone: true
})
export class CreditsSummaryComponent {
  public readonly summary: CreditsSummaryDTO = {
    currentCredits: 1250,
    lastPaymentDate: '2026-08-14',
    creditsPurchasedThisYear: 2100
  };
}
