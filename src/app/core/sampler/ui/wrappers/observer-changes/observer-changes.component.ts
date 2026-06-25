
import { Component, DestroyRef, effect, inject, OnDestroy, untracked } from "@angular/core"
import { AudioEditStateService } from "../../../state-manager/audio-edit-state.service"
import { SaveSampleUseCase } from "../../../application/use-cases/save-sample.use-case"
import { SampleEditedEntity } from "../../../domain/entities/sample-edited.entity"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"

@Component({
  selector: "app-observer-changes",
  templateUrl: "./observer-changes.component.html",
  standalone:true
})
export class ObserverChangesComponent implements OnDestroy{
    private readonly destroyRef = inject(DestroyRef)
  private readonly audioEditStateService =inject(AudioEditStateService)
  
  private readonly saveSampleUseCase =inject(SaveSampleUseCase)

  private saveTimeoutId?: ReturnType<typeof setTimeout>

  constructor() {
    this.observeChanges()
  }

  ngOnDestroy(): void {
    this.clearPendingSave()
  }

  private observeChanges(): void {
    effect(() => {
      // Dependencia reactiva
      this.audioEditStateService.effects()
      untracked(() => {
        const sampleEdited = this.audioEditStateService.getSampleEdited()
        if (!sampleEdited) {
          return
        }
        this.scheduleSave(sampleEdited)
      })
    })
  }

  private scheduleSave(
    sampleEdited: SampleEditedEntity
  ): void {

    this.clearPendingSave();

    this.saveTimeoutId = setTimeout(() => {

      this.saveSampleUseCase
        .execute(sampleEdited)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          error: (error) => {
            console.error(
              '[ObserverChanges] Error saving sample',
              error
            )
          },
        })

    }, 1000)

  }

  private clearPendingSave(): void {

    if (this.saveTimeoutId) {
      clearTimeout(this.saveTimeoutId)
      this.saveTimeoutId = undefined
    }

  }

}