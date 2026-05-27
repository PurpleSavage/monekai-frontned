import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { OutputFormat, OutputFormatType } from "../../../domain/value-objects/output-format.vo";
import { ModelVersion, ModelVersionType } from "../../../domain/value-objects/model-version.vo";
import { CreateSampleRequestDTO } from "../../../application/dtos/requests/create-sample-requet.dto";

@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class PromptInputComponent {
  public models = Object.values(ModelVersion)
  public formats = Object.values(OutputFormat)

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
  
  public onSubmit() {
    if (this.createSongFromGroup.valid) {
      const rawValues = this.createSongFromGroup.getRawValue()
      const requestPayload:CreateSampleRequestDTO = {
        ...rawValues,
        email: 'user-logged@monekai.com'
      }
    }
  }
  
}