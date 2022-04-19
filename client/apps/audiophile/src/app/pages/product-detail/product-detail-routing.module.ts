import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailPageComponent } from './containers';
import { ProductResolver } from './resolvers';

const routes: Routes = [
  {
    path: ':slug',
    component: ProductDetailPageComponent,
    resolve: {
      product: ProductResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
