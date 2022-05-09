import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFeedbackPageComponent } from './containers';
import { FeedbackExistsGuard } from '../../shared';

const routes: Routes = [
  {
    path: ':feedback_id',
    component: EditFeedbackPageComponent,
    canActivate: [FeedbackExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFeedbackRoutingModule {}
