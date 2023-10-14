import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrantedPage } from './granted.page';

const routes: Routes = [
  {
    path: '',
    component: GrantedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrantedPageRoutingModule {}
