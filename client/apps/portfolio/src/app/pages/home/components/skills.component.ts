import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image, identifyImage } from '@lbk/models';
import { fromData } from '../../../shared';

@Component({
  selector: 'lbk-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="flex flex-wrap items-center gap-6">
      <li *ngFor="let skill of skills; trackBy: identifyImage">
        <img class="w-[200px]" [src]="skill.desktop" [alt]="skill.alt" />
      </li>
    </ul>
  `,
})
export class SkillsComponent implements OnInit {
  skills!: Image[];
  identifyImage = identifyImage;

  ngOnInit(): void {
    this.skills = fromData.skills;
  }
}
