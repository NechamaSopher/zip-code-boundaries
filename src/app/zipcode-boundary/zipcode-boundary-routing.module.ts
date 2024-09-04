import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZipcodeBoundaryComponent } from './components/zipcode-boundary/zipcode-boundary.component';

const routes: Routes = [
  { path: '', component: ZipcodeBoundaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZipcodeBoundaryRoutingModule { }
