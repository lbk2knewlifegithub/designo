import { Component } from '@angular/core';

@Component({
  selector: 'lbk-hire-me-dialog',
  template: `
    <h2 class="font-bold text-xl">“Hire Me” Button</h2>

    <div class="text-sm text-secondary mt-4">
      <p>
        This will add a button to your profile, allowing people to contact you
        directly via email.
      </p>
      <p>
        We will never share your email address with anyone. However, replying to
        enquiries will expose your email address to the sender.
      </p>
    </div>

    <strong class="block mt-2 text-sm"
      >This is not part of the upcoming Hiring Platform.</strong
    >
  `,
  styles: [
    `
      :host {
        @apply block p-8 pt-12 text-center;
      }
    `,
  ],
})
export class HiremeDialogComponent {}
