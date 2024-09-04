import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'zipcode-boundary', loadChildren: () => import('./zipcode-boundary/zipcode-boundary.module').then(m => m.ZipcodeBoundaryModule) },
  { path: '', redirectTo: 'zipcode-boundary', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
