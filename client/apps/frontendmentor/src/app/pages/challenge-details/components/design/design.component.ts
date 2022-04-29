import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { Challenge } from '../../../../shared';

@Component({
  selector: 'lbk-design-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="cursor-pointer"
      (click)="lightbox.open()"
      *ngFor="let img of [image]"
      @zoomIn
      [src]="img"
      [alt]="challenge.name"
    />

    <ul class="flex flex-wrap gap-2 mt-4 md:gap-3 lg:mt-5">
      <li *ngFor="let design of challenge.design | objectKeys; index as i">
        <button
          [class.active]="i === index"
          (click)="changeIndex(i)"
          class="badge  bg-secondary/20 text-dark/60 italic text-xs uppercase md:px-4"
        >
          {{ design | whiteSpace }}
        </button>
      </li>
    </ul>

    <lbk-lightbox
      #lightbox
      [(shown)]="shownLightBox"
      [images]="images"
    ></lbk-lightbox>
  `,
  animations: [zoomIn()],
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {
  @Input() challenge!: Challenge;
  images!: string[];
  index = 0;
  shownLightBox = false;

  ngOnInit(): void {
    this.images = Object.values(this.challenge.design);
  }

  get image() {
    return this.images[this.index];
  }

  changeIndex(index: number) {
    this.index = index;
  }
}
