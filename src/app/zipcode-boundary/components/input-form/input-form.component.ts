import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {

  @Input() control: FormControl = new FormControl();
  @Input() disabledBtn: boolean;
  @Input() loadingBtn: boolean;
  @Input() textBtn: string;
  @Input() placeholder: string;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
}
