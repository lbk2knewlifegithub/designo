import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackExistsGuard } from '../../shared';
import { ViewFeedbackPageComponent } from './containers';

const routes: Routes = [
  {
    path: ':feedback_id',
    component: ViewFeedbackPageComponent,
    canActivate: [FeedbackExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFeedbackRoutingModule {}
