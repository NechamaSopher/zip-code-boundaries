import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoadingComponent } from './components/loading/loading.component';
import { BasicInputComponent } from './components/basic-input/basic-input.component';
import { BasicButtonComponent } from './components/basic-button/basic-button.component';

const components = [
  LoadingComponent,
  BasicInputComponent,
  BasicButtonComponent
]

@NgModule({
  declarations: [
    components,
  ],
  exports: [
    components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
