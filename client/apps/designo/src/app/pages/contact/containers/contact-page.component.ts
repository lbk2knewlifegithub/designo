import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInUpBig } from '@lbk/anims';

@Component({
  selector: 'lbk-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main @fadeInUpBig class="-pb-16 -mb-[120px] 2xl:-mb-[160px]">
      <!-- Contact Form -->
      <lbk-contact-form></lbk-contact-form>
      <!-- end Contact Form -->

      <!-- Locations -->
      <lbk-locations-link
        class="block mt-[120px] 2xl:mt-[160px]"
      ></lbk-locations-link>
      <!-- end Locations -->
    </main>
  `,
  animations: [fadeInUpBig()],
})
export class ContactPageComponent {}
