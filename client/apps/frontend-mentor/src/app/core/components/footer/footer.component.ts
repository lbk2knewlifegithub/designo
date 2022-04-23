import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer scrollTo class="container pt-16 border-t-4">
      <h2 class="text-xs font-bold">FRONTEND MENTOR</h2>

      <p class="text-xs mt-4">
        Gain real experience of building websites and providing code reviews.
        Build your portfolio and help others achieve their goals.
      </p>

      <!-- Explore -->
      <lbk-explore class="block mt-10"></lbk-explore>
      <!-- end Explore -->

      <!-- Community -->
      <lbk-community class="block mt-10"></lbk-community>
      <!-- end Community -->

      <!-- Socials -->
      <lbk-socials class="block mt-10"></lbk-socials>
      <!-- end Socials -->

      <!-- Copyright -->
      <lbk-copyright class="block mt-16"></lbk-copyright>
      <!-- end Copyright -->
    </footer>
  `,
})
export class FooterComponent {}
