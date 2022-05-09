import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { Challenge } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-gallery-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="cursor-pointer"
      (click)="lightbox.open()"
      [src]="image"
      [alt]="challenge.title"
    />

    <ul class="flex flex-wrap gap-2 mt-4 md:gap-3 lg:mt-5">
      <li *ngFor="let title of titles; index as i">
        <button
          class="badge  bg-secondary/20 text-dark/60 italic text-xs uppercase md:px-4"
          [class.active]="i === index"
          (click)="changeIndex(i)"
        >
          {{ title | whiteSpace }}
        </button>
      </li>
    </ul>

    <lbk-lightbox
      #lightbox
      [(shown)]="shownLightBox"
      [images]="previewImages"
    ></lbk-lightbox>
  `,
  styleUrls: ['./gallery.component.scss'],
})
export class DesignComponent implements OnInit {
  @Input() challenge!: Challenge;
  previewImages!: string[];
  titles!: string[];
  index = 0;
  shownLightBox = false;

  ngOnInit(): void {
    this.previewImages = this.challenge.gallery.map((i) => i.preview);
    this.titles = this.challenge.gallery.map((i) => i.title);
  }

  get image() {
    return this.previewImages[this.index];
  }

  changeIndex(index: number) {
    this.index = index;
  }
}
