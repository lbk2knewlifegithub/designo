import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { DifficultyModule } from '../difficulty/difficulty.component';
import { LanguageModule } from '../language.component';
import { ChallengePreviewComponent } from './challenge-preview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From FrontendMentor
    LanguageModule,
    ImageModule,
    DifficultyModule,
  ],
  exports: [ChallengePreviewComponent],
  declarations: [ChallengePreviewComponent],
})
export class ChallengePreviewModule {}
