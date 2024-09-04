import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss']
})
export class BasicInputComponent implements OnInit {

  @Input() label: string;
  @Input() type: string = 'text';
  @Input() placeholder: string;
  @Input() control: FormControl = new FormControl('');
  @Input() maxLength: number;
  @Input() disabled: boolean;

  @Output() enter: EventEmitter<void> = new EventEmitter();
  @Output() blur: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
