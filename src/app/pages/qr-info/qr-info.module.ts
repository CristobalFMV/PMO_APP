import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrInfoPageRoutingModule } from './qr-info-routing.module';

import { QrInfoPage } from './qr-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrInfoPageRoutingModule
  ],
  declarations: [QrInfoPage]
})
export class QrInfoPageModule {}
