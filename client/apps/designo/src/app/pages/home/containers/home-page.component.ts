import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <!-- Hero -->
      <lbk-hero></lbk-hero>
      <!-- end Hero -->

      <!-- Projects -->
      <lbk-projects class="block mt-[120px]"></lbk-projects>
      <!-- end Projects -->

      <!-- Features -->
      <lbk-features class="block mt-[120px]"></lbk-features>
      <!-- end Features -->
    </main>

    <!-- 
  
  
  
  Let’s talk about your project
  Ready to take it to the next level? Contact us today and find out how our expertise can help your business grow.
  Get in touch
  
  Our company
  Locations
  Contact
  
  Designo Central Office
  3886 Wellington Street
  Toronto, Ontario M9C 3J5
  
  Contact Us (Central Office)
  P : +1 253-863-8967
  M : contact@designo.co -->
  `,
})
export class HomePageComponent {}
