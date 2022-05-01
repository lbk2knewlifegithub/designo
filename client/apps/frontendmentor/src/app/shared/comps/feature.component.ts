import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-feature',
  template: `
    <img class="min-w-[20px]" [src]="icon" [alt]="alt" />
    <span [class.text-secondary]="!unlock" class="inline-flex items-center">
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      :host {
        @apply flex items-start gap-2 text-sm xl:text-base;
      }
    `,
  ],
})
export class FeatureComponent implements OnInit {
  @Input() unlock?: boolean;

  icon!: string;
  alt!: string;

  ngOnInit(): void {
    this.icon = this.unlock
      ? 'assets/images/shared/icon-check.svg'
      : 'assets/images/shared/icon-cross.svg';

    this.alt = this.unlock ? 'Check' : 'Cross';
  }
}

@NgModule({
  exports: [FeatureComponent],
  declarations: [FeatureComponent],
})
export class FeatureModule {}
