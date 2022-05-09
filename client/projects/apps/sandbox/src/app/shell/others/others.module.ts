import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OthersComponent } from './others.component';
import { RouterModule } from '@angular/router';
import {
  AddToCartAnimModule, AnimatedDigitModule, CheckListAnimateModule,
  FeedbackReactionModule,
  FoldedPosterModule,
  MagicStringsModule
} from '@lbk/shared/components/others';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [OthersComponent],
  exports: [OthersComponent],
  imports: [
    CommonModule,
    MagicStringsModule,
    MatTooltipModule,
    AddToCartAnimModule,
    FeedbackReactionModule,
    FoldedPosterModule,
    CheckListAnimateModule,
    RouterModule.forChild([{
      path: '',
      component: OthersComponent
    }]),
    AnimatedDigitModule
  ]
})
export class OthersModule {
}
