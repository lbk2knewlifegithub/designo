import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { zoomIn } from '@lbk/anims';

@Component({
  selector: 'lbk-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="shown"
      class="fixed z-50 grid place-content-center inset-0 bg-black/50"
    >
      <!-- Close Icon -->
      <button
        (click)="close()"
        class="duration-300 fixed text-white right-8 top-4 w-12 h-12 rounded-full hover:bg-white hover:text-black"
        aria-label="Close"
      >
        <i class="fa-solid fa-xmark text-2xl"></i>
      </button>
      <!-- end Close Icon -->

      <!-- Image -->
      <img [src]="image" alt="" />
      <!-- end Image -->

      <div class="mt-10 flex justify-center items-center gap-6 lg:mt-0">
        <!-- Previous Icon -->
        <button
          (click)="previous()"
          *ngIf="index !== 0; else noPrevious"
          class="lg:fixed left-8 top-1/2 -translate-y-1/2 navigate-btn"
          aria-label="Previous"
        >
          <i class="fa-solid fa-arrow-left text-2xl"></i>
        </button>
        <ng-template #noPrevious>
          <span class="min-w-[52px]"></span>
        </ng-template>
        <!-- end Previous Icon -->

        <!-- Next  Icon -->
        <button
          *ngIf="index !== images.length - 1; else noNext"
          (click)="next()"
          class="lg:fixed right-8 top-1/2 -translate-y-1/2 navigate-btn"
          aria-label="Next"
        >
          <i class="fa-solid fa-arrow-right text-2xl"></i>
        </button>
        <ng-template #noNext>
          <span class="min-w-[52px]"></span>
        </ng-template>
        <!-- end Next Icon -->
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        .navigate-btn {
          @apply duration-300 text-white  px-4 py-2 rounded-full hover:bg-white hover:text-black;
        }
      }
    `,
  ],
})
export class LightboxComponent {
  @Input() images!: string[];
  @Input() shown = false;
  @Output() shownChange = new EventEmitter<boolean>();

  index = 0;

  next() {
    if (this.index === this.images.length) return;
    this.index++;
  }

  previous() {
    if (this.index === 0) return;
    this.index--;
  }

  close() {
    this.shown = false;
    this.shownChange.emit(false);
  }

  open() {
    this.shown = true;
    this.shownChange.emit(true);
  }

  get image() {
    return this.images[this.index];
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [LightboxComponent],
  declarations: [LightboxComponent],
})
export class LightBoxModule {}
