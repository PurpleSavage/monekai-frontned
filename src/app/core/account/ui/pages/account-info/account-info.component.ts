import { Component } from "@angular/core";
import { PersonalInfoDTO } from "../../../application/dtos/responses/personal-info.dto";
import { PaymentHistoryComponent } from "../../components/payment-history/payment-history.component";

@Component({
  templateUrl: './account-info.component.html',
  selector: 'app-account-info',
  standalone: true,
  imports: [PaymentHistoryComponent],
})
export class AccountInfoComponent {
  public readonly title = 'Account';
  public readonly subtitle = 'Your personal information and account details.';

  public readonly personalInfo: PersonalInfoDTO = {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'Jean Perez',
    email: 'jean.perez@gmail.com',
    photoUrl: null,
    createdAt: '2026-01-15',
    credits: 1250,
    plan: 'Free',
    country: 'Colombia'
  };

  public get initials(): string {
    return this.personalInfo.name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}
