import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrInfoPage } from './qr-info.page';

const routes: Routes = [
  {
    path: '',
    component: QrInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrInfoPageRoutingModule {}
