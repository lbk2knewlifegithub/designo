import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@lbk/comps';
import { LanguageModule } from '../language.component';
import { ChallengePreviewComponent } from './challenge-preview.component';
import { DifficultyComponent } from './difficulty/difficulty.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From FrontendMentor
    LanguageModule,
    ImageModule,
  ],
  exports: [ChallengePreviewComponent, DifficultyComponent],
  declarations: [ChallengePreviewComponent, DifficultyComponent],
})
export class ChallengePreviewModule {}
