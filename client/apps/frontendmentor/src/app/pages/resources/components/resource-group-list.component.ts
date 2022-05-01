import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  identifyResource,
  identifyResourceGroup,
  identifyResourceType,
  ResourceGroup,
} from '../../../shared';

@Component({
  selector: 'lbk-resource-group-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid gap-36">
      <li *ngFor="let group of resourcesGroups; trackBy: identifyResourceGroup">
        <!-- Group Name -->
        <h1 class="font-black uppercase tracking-[.25rem] text-center">
          {{ group.name }}
        </h1>
        <!-- end Group Name -->

        <!-- List Types -->
        <ul class="mt-12 grid gap-32">
          <li *ngFor="let type of group.types; trackBy: identifyResourceType">
            <!-- Type Name -->
            <div class="flex items-center gap-4">
              <h2 class="font-medium text-xl">{{ type.name }}</h2>
              <span class="h-[1px] bg-dark/20 grow"></span>
            </div>
            <!-- end Type Name -->

            <!-- List Resource -->
            <ul
              class="grid place-items-center mt-10 gap-6 md:grid-cols-2 md:place-items-stretch lg:grid-cols-3"
            >
              <li
                *ngFor="
                  let resource of type.resources;
                  trackBy: identifyResource
                "
              >
                <lbk-resource [resource]="resource"></lbk-resource>
              </li>
            </ul>
            <!-- end List Resource -->
          </li>
        </ul>
        <!-- end List Types -->
      </li>
    </ul>
  `,
})
export class ResourceGroupListComponent {
  @Input()
  resourcesGroups!: ResourceGroup[];

  identifyResourceGroup = identifyResourceGroup;
  identifyResource = identifyResource;
  identifyResourceType = identifyResourceType;
}
