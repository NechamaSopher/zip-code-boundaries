import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ZipcodeBoundaryComponent } from './components/zipcode-boundary/zipcode-boundary.component';
import { ZipcodeBoundaryRoutingModule } from './zipcode-boundary-routing.module';
import { InputFormComponent } from './components/input-form/input-form.component';

@NgModule({
  declarations: [
    ZipcodeBoundaryComponent,
    InputFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ZipcodeBoundaryRoutingModule,
  ]
})
export class ZipcodeBoundaryModule { }
