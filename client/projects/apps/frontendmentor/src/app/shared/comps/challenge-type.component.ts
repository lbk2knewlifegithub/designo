import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    NgModule
} from '@angular/core';
import { Challenge } from './../models';

@Component({
  selector: 'lbk-challenge-type',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="inline-flex gap-2">
      <!-- Is New -->
      <li *ngIf="challenge.isNew">
        <span class="badge badge-error inline-flex gap-1 items-center">
          <i class="fa-solid fa-asterisk"></i>
          NEW
        </span>
      </li>
      <!-- end Is New -->

      <!-- Is Free  -->
      <li *ngIf="challenge.type === 'free'">
        <span class="badge badge-secondary"> FREE </span>
      </li>
      <!-- end Is Free  -->

      <!-- Is Premium -->
      <li *ngIf="challenge.type === 'premium'">
        <span class="badge badge-primary"> PREMIUM </span>
      </li>
      <!-- end Is Premium -->
    </ul>
  `,
})
export class ChallengeTypeComponent {
  @Input() challenge!: Challenge;
}

@NgModule({
  imports: [CommonModule],
  exports: [ChallengeTypeComponent],
  declarations: [ChallengeTypeComponent],
})
export class ChallengeTypeModule {}
