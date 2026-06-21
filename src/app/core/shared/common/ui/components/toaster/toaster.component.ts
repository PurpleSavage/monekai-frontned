import { Component, Input } from "@angular/core";
import { NgxSonnerToaster, Position } from 'ngx-sonner';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  imports: [NgxSonnerToaster],
  standalone: true,
})
export class ToasterComponent {
  @Input() position: Position = 'top-right';
  @Input() richColors: boolean = true;
  @Input() expand: boolean = false;
  @Input() duration: number = 4000;
  @Input() closeButton: boolean = true;
  @Input() visibleToasts: number = 3;
  @Input() theme: 'light' | 'dark' | 'system' = 'dark';
}

