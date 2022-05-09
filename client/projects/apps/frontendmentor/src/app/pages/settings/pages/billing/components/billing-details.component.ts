import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-billing-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <h1 class="font-bold text-lg tracking-widest">BILLING DETAILS</h1>

      <ul class="mt-4 grid gap-4 md:grid-cols-3">
        <!-- Current Subscription -->
        <li class="bg-secondary-50 p-6 shadow-sm">
          <h2 class="text-secondary text-sm lg:text-base lg:text-medium">
            Current subscription
          </h2>
          <h3 class="mt-4 text-5xl font-bold md:text-4xl lg:text-5xl">
            Cancelled
          </h3>
        </li>
        <!-- end Current Subscription -->

        <!-- Next Payment Due -->
        <li class="bg-secondary-50 p-6 shadow-sm">
          <h2 class="text-secondary text-sm lg:text-base lg:text-medium">
            Next payment due
          </h2>
          <span class="mt-10 block bg-dark h-1 w-5"></span>
        </li>
        <!-- end Next Payment Due -->

        <!-- Frequent actions -->
        <li class="bg-secondary-50 p-6 shadow-sm">
          <h2 class="text-secondary text-sm lg:text-base lg:text-medium">
            Frequent actions
          </h2>

          <div class="mt-4 md:mt-8">
            <a
              class="text-sm underline text-primary lg:text-base lg:font-medium"
              routerLink="/unlock-pro"
              >Unlock Frontend Mentor PRO</a
            >
          </div>
        </li>
        <!-- end Frequent actions -->
      </ul>
    </section>
  `,
})
export class BillingDetailsComponent {}
