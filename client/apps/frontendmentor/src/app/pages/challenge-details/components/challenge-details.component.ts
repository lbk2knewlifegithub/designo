import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge } from '../../../shared';

@Component({
  selector: 'lbk-challenge-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img [src]="challenge.image" [alt]="challenge.name" />

    <ul class="flex flex-wrap gap-2 mt-4">
      <li *ngFor="let design of challenge.design | objectKeys">
        <button class="badge badge-primary italic text-xs uppercase">
          {{ design | whiteSpace }}
        </button>
      </li>
    </ul>

    <div class="flex justify-between items-end mt-10">
      <!-- Tech Stacks -->
      <ul class="flex gap-2">
        <li *ngFor="let language of challenge.languages">
          <lbk-language [classList]="language">{{ language }}</lbk-language>
        </li>
      </ul>
      <!-- end Tech Stacks -->

      <!-- Difficulty -->
      <lbk-difficulty [difficulty]="challenge.difficulty"></lbk-difficulty>
      <!-- end Difficulty -->
    </div>

    <!-- Name -->
    <h1
      [routerLink]="['/challenge', challenge.challenge_id]"
      class="text-2xl font-medium font-heading mt-4"
    >
      {{ challenge.name }}
    </h1>
    <!-- end Name -->

    <!-- Description -->
    <p class="text-sm text-secondary mt-8">
      {{ challenge.description }}
    </p>
    <!-- end Description -->

    <lbk-assets-provided class="block mt-10"></lbk-assets-provided>

    <lbk-stared-challenge class="mt-8"></lbk-stared-challenge>

    <div class="mt-8">
      <a class="btn btn-primary italic px-6 font-bold tracking-widest"
        >VISIT CHALLENGE HUB</a
      >
    </div>

    <div class="mt-24">
      <h2 class="font-bold tracking-widest text-center">CHALLENGE</h2>

      <lbk-brief class="block mt-24"></lbk-brief>

      <lbk-get-started class="block mt-24"></lbk-get-started>

      <lbk-test-yourself class="block mt-10"></lbk-test-yourself>

      <!-- Start Challenge -->

      <div class="mt-10">
        <button class="btn btn-icon btn-error font-bold gap-4 px-12 italic">
          START CHALLENGE (FREE)
          <svg width="11" height="12" xmlns="http://www.w3.org/2000/svg">
            <g
              stroke="#FFF"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M1 10.922h9M2.508 1.264C3.492 5.661 4.475 7.86 5.457 7.86c.982 0 1.963-2.199 2.943-6.596"
              ></path>
            </g>
          </svg>
        </button>
        <!-- end Start Challenge -->
      </div>
    </div>
  `,
})
export class ChallengeDetailsComponent {
  @Input() challenge!: Challenge;
}
