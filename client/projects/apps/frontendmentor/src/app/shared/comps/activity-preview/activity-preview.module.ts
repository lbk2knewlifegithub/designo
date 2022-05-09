import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { LanguageListModule } from '../language-list';
import { MaskAsHelpFullModule } from '../mask-as-helpful.component';
import { NumberOfModule } from '../number-of.component';
import { VoteModule } from '../vote.component';
import { ActivityPreviewComponent } from './activity-preview.component';
import { RepliesComponent } from './replies.component';

@NgModule({
  imports: [
    CommonModule,
    // Shared Components From FrontendMentor
    NumberOfModule,
    LanguageListModule,
    VoteModule,
    MaskAsHelpFullModule,
    // Shared Components From Libs
    ImageModule,
  ],
  exports: [ActivityPreviewComponent],
  declarations: [ActivityPreviewComponent, RepliesComponent],
})
export class ActivityPreviewModule {}
