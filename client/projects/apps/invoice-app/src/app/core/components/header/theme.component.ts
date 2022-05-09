import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="text-primary-800 duration-300 hover:text-primary-900">
      <span class="{{ icon }} text-xl md:text-2xl"></span>
    </button>
  `,
})
export class ThemeComponent {
  @Input() darkTheme!: boolean;

  get icon() {
    return this.darkTheme ? 'fa fa-sun' : 'fa fa-moon';
  }
}
