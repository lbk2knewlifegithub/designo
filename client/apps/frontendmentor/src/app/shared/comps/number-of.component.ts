import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
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

      :host-context(.bold) {
        &.bookmarks,
        &.comment {
          @apply text-primary;
        }

        &.likes {
          @apply text-error;
        }
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

  static ICONS_SOLID = {
    comment: 'fa-solid fa-message',
    likes: 'fa-solid fa-heart',
    bookmarks: 'fa-solid fa-bookmark',
  };

  @Input() class!: string;
  @Input() of!: 'comment' | 'likes' | 'bookmarks';
  @Input() bold?: boolean;

  @HostBinding('class') get myClass() {
    return `${this.class ?? ''} ${this.of} ${this.bold ? 'bold' : ''}`;
  }
  icon!: string;

  ngOnInit(): void {
    this.icon = this.bold
      ? NumberOfComponent.ICONS_SOLID[this.of]
      : NumberOfComponent.ICONS[this.of];
  }
}

@NgModule({
  exports: [NumberOfComponent],
  declarations: [NumberOfComponent],
})
export class NumberOfModule {}
