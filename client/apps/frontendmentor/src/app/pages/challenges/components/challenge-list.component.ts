import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge } from './../../../shared';

@Component({
  selector: 'lbk-challenge-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
        doloremque, dolor, ut impedit qui corrupti minima illo ipsam accusamus
        error minus odit fugit libero magni dolore adipisci. Veritatis, quos
        maiores!
      </li>
    </ul>
  `,
})
export class ChallengeListComponent {
  @Input() challenges!: Challenge[];
}
