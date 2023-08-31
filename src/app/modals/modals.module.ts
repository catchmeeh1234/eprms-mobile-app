import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrSpecificViewComponent } from './pr-specific-view/pr-specific-view.component';


@NgModule({
  declarations: [PrSpecificViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class ModalsModule { }
