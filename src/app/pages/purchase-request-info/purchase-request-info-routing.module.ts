import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseRequestInfoPage } from './purchase-request-info.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRequestInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRequestInfoPageRoutingModule {}
