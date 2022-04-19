import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './containers/category-page.component';
import { CategoryResolver } from './resolver';

const routes: Routes = [
  {
    path: ':name',
    component: CategoryPageComponent,
    resolve: { products: CategoryResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
