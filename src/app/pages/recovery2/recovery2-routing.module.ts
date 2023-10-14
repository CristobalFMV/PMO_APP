import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Recovery2Page } from './recovery2.page';

const routes: Routes = [
  {
    path: '',
    component: Recovery2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Recovery2PageRoutingModule {}
