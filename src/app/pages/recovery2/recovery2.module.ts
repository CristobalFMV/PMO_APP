import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Recovery2PageRoutingModule } from './recovery2-routing.module';

import { Recovery2Page } from './recovery2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Recovery2PageRoutingModule
  ],
  declarations: [Recovery2Page]
})
export class Recovery2PageModule {}
