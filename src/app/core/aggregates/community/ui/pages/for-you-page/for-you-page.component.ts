import { Component, inject, OnInit, signal } from "@angular/core";
import { ListLatestSharedEditSamplesUseCase } from "../../../application/use-cases/list-latest-shared-edit-samples.use-case";
import { LatestRequestDTO } from "../../../application/dtos/requests/latest-request.dto";
import { ListLatestSharedSamplesUseCase } from "../../../application/use-cases/list-latest-shared-samples.use-case";
import { LatestSamplesStateService } from "../../../state-manager/latest-samples-state.service";
import { AppBaseError } from "../../../../../shared/common/infrastructure/http-errors/app-base.error";

@Component({
  selector: 'app-for-you-page',
  templateUrl: './for-you-page.component.html',
  standalone:true
})
export class ForYouPageComponent  implements OnInit{
  private listSamplesEditedUseCase = inject(ListLatestSharedEditSamplesUseCase)
  private listSahredSamplesUseCase = inject(ListLatestSharedSamplesUseCase)
  private latestSamplesStateService = inject(LatestSamplesStateService)
  private errorLisSharedSamples = signal<string>('')
  private errorLisEditSharedSamples = signal<string>('')
  
  ngOnInit(): void {
    const dto: LatestRequestDTO = {
      limit:15
    }
    this.listSharedEditSamples(dto)
    this.listSharedSamples(dto)
  }

  listSharedEditSamples(dto: LatestRequestDTO ):void { 
    this.listSamplesEditedUseCase.execute(dto).subscribe({
      next: (response) => {
        const list = response.data
        this.latestSamplesStateService.setListSharedEditSamples(list)
      },
      error: (error) => { 
        if (error instanceof AppBaseError) {

          this.errorLisEditSharedSamples.set(
            error.message
          );

        }
      }
    })
  }
  listSharedSamples(dto: LatestRequestDTO ): void { 
    this.listSahredSamplesUseCase.execute(dto).subscribe({
      next: (response) => {
        const list = response.data
        this.latestSamplesStateService.setListSharedSamples(list)
      },
      error: (error) => { 
        if (error instanceof AppBaseError) {

          this.errorLisSharedSamples.set(
            error.message
          );

        }
      }
    })
  }
}