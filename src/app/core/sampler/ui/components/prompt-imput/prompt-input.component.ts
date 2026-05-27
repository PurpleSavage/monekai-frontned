import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { OutputFormat, OutputFormatType } from "../../../domain/value-objects/output-format.vo";
import { ModelVersion, ModelVersionType } from "../../../domain/value-objects/model-version.vo";
import { CreateSampleRequestDTO } from "../../../application/dtos/requests/create-sample-requet.dto";
import { AuthStateManager } from "../../../../shared/auth/state-manager/auth-state.service";

@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class PromptInputComponent {
  public models = Object.values(ModelVersion)
  public formats = Object.values(OutputFormat)
  public authState = inject(AuthStateManager)
 

  public createSongFromGroup = new FormGroup({
    prompt: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)]
    }),
    modelVersion: new FormControl<ModelVersionType>(ModelVersion.stereoLarge, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    duration: new FormControl<number>(15, { 
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(120)]
    }),
    outputFormat: new FormControl<OutputFormatType>(OutputFormat.mp3, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    sampleName: new FormControl<string>('My Awesome Sample', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)]
    })
  })
  get promptControl(): FormControl<string> {
    return this.createSongFromGroup.controls.prompt
  }
  
  get sampleNameControl(): FormControl<string> {
    return this.createSongFromGroup.controls.sampleName
  }
  public onSubmit() {
    const email = this.authState.session()?.userData.email
    if(!email) return
    if (this.createSongFromGroup.valid) {
      const rawValues = this.createSongFromGroup.getRawValue()
      const requestPayload:CreateSampleRequestDTO = {
        ...rawValues,
        email: email
      } 
    }
    
  }
  
}