import { Component } from '@angular/core';

@Component({
  selector: 'lbk-back-dashboard',
  template: `
    <a routerLink="/dashboard" class="font-bold flex gap-2 items-end group">
      <!-- Angle Left -->
      <i class="duration-300 fa-solid fa-angle-left text-xl group-hover:-translate-x-2"></i>
      <!-- end Angle Left -->

      <span class="text-sm"> BACK TO DASHBOARD </span>
    </a>
  `,
})
export class BackDashboardComponent {}
