import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrantedPageRoutingModule } from './granted-routing.module';

import { GrantedPage } from './granted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrantedPageRoutingModule
  ],
  declarations: [GrantedPage]
})
export class GrantedPageModule {}
