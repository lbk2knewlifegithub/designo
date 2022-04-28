import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'lbk-number-of',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i [classList]="icon"></i>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        @apply inline-flex gap-1 items-center;
      }
    `,
  ],
})
export class NumberOfComponent implements OnInit {
  static ICONS = {
    comment: 'fa-regular fa-message',
    likes: 'fa-regular fa-heart',
    bookmarks: 'fa-regular fa-bookmark',
  };

  @Input() of!: 'comment' | 'likes' | 'bookmarks';
  icon!: string;

  ngOnInit(): void {
    this.icon = NumberOfComponent.ICONS[this.of];
  }
}

@NgModule({
  exports: [NumberOfComponent],
  declarations: [NumberOfComponent],
})
export class NumberOfModule {}
