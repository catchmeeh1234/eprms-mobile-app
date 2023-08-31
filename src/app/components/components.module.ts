import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserMenuProfileComponent } from './user-menu-profile/user-menu-profile.component';
import { PrCreatedComponent } from './pr-created/pr-created.component';
import { PrDisapprovedComponent } from './pr-disapproved/pr-disapproved.component';
import { PrCreatedPerMonthComponent } from './pr-created-per-month/pr-created-per-month.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { TakeActionComponent } from './take-action/take-action.component';


@NgModule({
  declarations: [UserMenuProfileComponent, PrCreatedComponent, PrDisapprovedComponent, PrCreatedPerMonthComponent, HeaderComponent, TakeActionComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    UserMenuProfileComponent,
    PrCreatedComponent,
    PrDisapprovedComponent,
    PrCreatedPerMonthComponent,
    HeaderComponent,
    TakeActionComponent
  ]
})
export class ComponentsModule { }
