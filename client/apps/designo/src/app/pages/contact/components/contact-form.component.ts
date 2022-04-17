import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container bg-peach-200 py-[72px] text-white">
      <div class="text-center">
        <h2 class="text-lg">Contact Us</h2>
        <p class="mt-6 text-sm">
          Ready to take it to the next level? Let’s talk about your project or
          idea and find out how we can help your business grow. If you are
          looking for unique digital experiences that’s relatable to your users,
          drop us a line.
        </p>
      </div>

      <form class="mt-12 grid place-items-center">
        <div class="grid gap-6 w-full">
          <!-- Name -->
          <input type="text" placeholder="Name" />
          <!-- end Name -->

          <!-- Email -->
          <input type="email" placeholder="Email" />
          <!-- end Email -->

          <!-- Phone -->
          <input type="text" placeholder="Phone" />
          <!-- end Phone -->

          <!-- Message -->
          <textarea rows="3" placeholder="Your Message"></textarea>
          <!-- end Message -->
        </div>

        <!-- Submit Button -->
        <button class="btn btn-white px-12 mt-10">SUBMIT</button>
        <!-- end Submit Button -->
      </form>
    </section>
  `,
  styles: [
    `
      [type='text'],
      [type='email'],
      textarea {
        @apply bg-transparent text-white placeholder-white-200/60;
        @apply border-transparent border-b border-b-white pb-2 pl-2;
      }
    `,
  ],
})
export class ContactFormComponent {}
