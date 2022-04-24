import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FAQPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: FAQPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAQRoutingModule {}
