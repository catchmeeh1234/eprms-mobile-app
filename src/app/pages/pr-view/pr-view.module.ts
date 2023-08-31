import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrViewPageRoutingModule } from './pr-view-routing.module';

import { PrViewPage } from './pr-view.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PrFilterPipe } from './pr-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrViewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PrViewPage, PrFilterPipe]
})
export class PrViewPageModule {}
