import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostListener,
  Input,
} from '@angular/core';
import { fadeIn, fadeOut } from '@lbk/anims';
import { DropDownContentDirective } from './dropdown-content.directive';

@Component({
  selector: 'lbk-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    Toggle-->
    <ng-content></ng-content>
    <!--    end Toggle-->

    <!--    Content-->
    <div
      *ngIf="shown"
      @fadeIn
      @fadeOut
      (click)="contentClick()"
      class="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2"
    >
      <ng-template [ngTemplateOutlet]="content.templateRef"></ng-template>
    </div>
    <!--    end Content-->
  `,
  styles: [
    `
      :host {
        position: relative;
      }
    `,
  ],
  animations: [fadeIn(), fadeOut()],
})
export class DropDownComponent {
  @Input() closeWhenContentClick = true;
  @Input() shown!: boolean;

  @ContentChild(DropDownContentDirective) content!: DropDownContentDirective;

  constructor(private readonly _cd: ChangeDetectorRef) {}

  show(detectChange = false) {
    this.shown = true;

    if (detectChange) {
      this._cd.detectChanges();
    }
  }

  close(detectChange = false) {
    this.shown = false;

    if (detectChange) {
      this._cd.detectChanges();
    }
  }
  toggle(detectChange = false) {
    this.shown = !this.shown;

    if (detectChange) {
      this._cd.detectChanges();
    }
  }

  contentClick() {
    if (this.closeWhenContentClick) {
      this.close(true);
    }
  }
}
