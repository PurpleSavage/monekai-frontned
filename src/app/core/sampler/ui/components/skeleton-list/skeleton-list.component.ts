import { Component } from "@angular/core";


@Component({
  selector: 'app-skeleton-list',
  standalone: true,
  templateUrl: './skeleton-list.component.html',
  imports: [
    
  ]
})
export class SkeletonListComponent {

  public skeletons = Array(6);

}