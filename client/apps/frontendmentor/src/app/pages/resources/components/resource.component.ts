import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Resource } from '../../../shared';

@Component({
  selector: 'lbk-resource',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Resource Image -->
    <a
      [href]="resource.href"
      target="_blank"
      aria-label="freeCodeCamp"
      class="block overflow-hidden w-full max-h-[464px]"
    >
      <lbk-image
        classImage="duration-300 hover:scale-110"
        [singleImage]="resource.image"
        [alt]="resource.name"
      >
      </lbk-image>
    </a>
    <!-- end Resource Image -->

    <div class="p-5 shadow-md border-t bg-white">
      <div class="flex items-center gap-2">
        <!-- Name -->
        <h3 class="text-xl font-medium font-heading lg:text-2xl">
          {{ resource.name }}
        </h3>
        <!-- end Name -->

        <!-- Link Icon -->
        <a target="_blank" aria-label="freeCodeCamp" [href]="resource.href">
          <i class="opacity-20 fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <!-- end Link Icon-->
      </div>

      <div class="flex justify-between items-end mt-2 lg:mt-4">
        <!-- Tech Stacks -->
        <ul class="flex gap-2">
          <li *ngFor="let tech of resource.techStacks">
            <lbk-tech [classList]="tech">{{ tech }}</lbk-tech>
          </li>
        </ul>
        <!-- end Tech Stacks -->

        <ul class="flex gap-2">
          <li *ngIf="resource.isAffiliate">
            <span class="badge badge-accent-outline">AFFILIATE</span>
          </li>

          <li class="badge badge-primary-outline">
            <ng-container *ngIf="!resource.price; else notFree">
              FREE
            </ng-container>
            <!-- Price -->
            <ng-template #notFree>
              {{ resource.price }}
            </ng-template>
            <!-- end Price -->
          </li>
        </ul>
      </div>

      <!-- Description -->
      <p class="text-sm text-secondary mt-4 lg:text-base lg:mt-5">
        {{ resource.description }}
      </p>
      <!-- end Description -->
    </div>
  `,
  styles: [
    `
      :host {
        @apply block relative shadow-md rounded-lg overflow-hidden max-w-[490px];
      }
    `,
  ],
})
export class ResourceComponent {
  @Input() resource!: Resource;
}
