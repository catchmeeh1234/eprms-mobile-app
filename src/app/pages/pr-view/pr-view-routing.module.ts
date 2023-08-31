import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrViewPage } from './pr-view.page';

const routes: Routes = [
  {
    path: '',
    component: PrViewPage,
    children: [
      {
        path: 'purchase-request-info',
        loadChildren: () => import('../purchase-request-info/purchase-request-info.module').then(m => m.PurchaseRequestInfoPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrViewPageRoutingModule {}
