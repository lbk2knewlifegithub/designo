import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-upvote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="upvote.emit()"
      [class.upvoted]="upvoted"
      class="group btn btn-secondary min-w-[40px] max-h-[50px] btn-icon text-neutral-300 "
    >
      <i
        class="fa-solid fa-angle-up duration-300  group-hover:-translate-y-[2px]"
      ></i>
      {{ upvotes }}
    </button>
  `,
  styles: [
    `
      :host-context(.md-col) {
        button {
          @apply md:flex-col md:items-center md:gap-1 md:px-2;
        }
      }

      .upvoted {
        @apply bg-primary-200 text-white;
      }
    `,
  ],
})
export class UpvoteComponent {
  @Input() upvotes!: number;
  @Input() upvoted!: boolean;

  @Output() upvote = new EventEmitter<void>();
}

@NgModule({
  imports: [CommonModule],
  exports: [UpvoteComponent],
  declarations: [UpvoteComponent],
})
export class UpvoteModule {}
