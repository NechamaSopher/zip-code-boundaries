import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicButtonComponent {

  @Input() text: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

}
