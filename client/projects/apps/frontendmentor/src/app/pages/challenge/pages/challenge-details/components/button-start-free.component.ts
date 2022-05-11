import { ChallengesFacade } from '@lbk/fm/state';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-button-start-free',
  template: `
    <lbk-spinner [radius]="48" [loading]="loading$ | async">
      <button
        (click)="startChallenge()"
        class="btn btn-icon btn-error font-bold gap-4 px-12 italic md:px-16"
      >
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
    </lbk-spinner>
  `,
})
export class ButtonStartFreeComponent implements OnInit {
  loading$!: Observable<boolean>;
  constructor(private readonly _challengeFacade: ChallengesFacade) {}

  ngOnInit(): void {
    this.loading$ = this._challengeFacade.startingChallenge$;
  }

  startChallenge() {
    this._challengeFacade.startChallenge();
  }
}
