import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() size: 'S' | 'M'| 'L' = 'S'
}
