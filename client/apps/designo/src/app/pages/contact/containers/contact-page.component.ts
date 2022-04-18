import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <!-- Contact Form -->
      <lbk-contact-form></lbk-contact-form>
      <!-- end Contact Form -->

      <!-- Locations -->
      <lbk-locations-link
        data-aos="zoom-out"
        class="block mt-[120px] 2xl:mt-[160px]"
      ></lbk-locations-link>
      <!-- end Locations -->
    </main>
  `,
})
export class ContactPageComponent {}
