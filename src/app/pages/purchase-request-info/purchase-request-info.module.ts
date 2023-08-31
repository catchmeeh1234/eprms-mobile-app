import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseRequestInfoPageRoutingModule } from './purchase-request-info-routing.module';

import { PurchaseRequestInfoPage } from './purchase-request-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseRequestInfoPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [PurchaseRequestInfoPage]
})
export class PurchaseRequestInfoPageModule {}
