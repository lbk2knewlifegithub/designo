import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-socials',
  template: `
    <ul>
      <!-- Twitter -->
      <li class="twitter">
        <a class="!border-[#1da0f2]" aria-label="Twitter" href="/">
          <img src="assets/images/shared/twitter.svg" alt="Twitter" />
        </a>
      </li>
      <!-- end Twitter -->

      <!-- LinkedIn -->
      <li class="linkedin">
        <a aria-label="LinkedIn" href="/">
          <img src="assets/images/shared/linkedin.svg" alt="LinkedIn" />
        </a>
      </li>
      <!-- end Linked -->

      <!-- Facebook -->
      <li class="facebook">
        <a aria-label="Facebook" href="/">
          <img src="assets/images/shared/facebook.svg" alt="Facebook" />
        </a>
      </li>
      <!-- end Facebook -->
    </ul>
  `,
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent {}

@NgModule({
  exports: [SocialsComponent],
  declarations: [SocialsComponent],
})
export class SocialsModule {}
