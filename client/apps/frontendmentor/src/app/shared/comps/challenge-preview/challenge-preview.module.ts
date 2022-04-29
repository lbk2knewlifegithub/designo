import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { ChallengeTypeModule } from '../challenge-type.component';
import { DifficultyModule } from '../difficulty/difficulty.component';
import { LanguageListModule } from '../language-list';
import { ChallengePreviewComponent } from './challenge-preview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From FrontendMentor
    LanguageListModule,
    ImageModule,
    DifficultyModule,
    ChallengeTypeModule,
  ],
  exports: [ChallengePreviewComponent],
  declarations: [ChallengePreviewComponent],
})
export class ChallengePreviewModule {}
