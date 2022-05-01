import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-tags-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      <strong class="text-xs md:text-sm">Tags</strong>
      <p class="text-xs text-secondary italic md:text-sm md:mt-1">
        Add up to 5 tags. Don't see the tag you want? Request it by emailing
        <a routerLink="/">hi@frontendmentor.io.</a>
      </p>
      <select class="w-full mt-1" placeholder="Select..">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </label>
  `,
})
export class TagsComponent {}
