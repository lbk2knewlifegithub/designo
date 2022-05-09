import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: CreateFeedbackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFeedbackRoutingModule {}
