import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn } from '@lbk/anims';
import { ResourceGroupName, ResourceTypeName } from '../../../shared';

interface Group {
  name: ResourceGroupName;
  types: ResourceTypeName[];
}

@Component({
  selector: 'lbk-sub-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="relative md:container">
      <div class="container  flex justify-between md:px-0">
        <h2
          class="uppercase inline-block font-bold text-sm p-4 border-x ml-3 lg:ml-0 lg:px-6"
        >
          RESOURCES
        </h2>

        <!-- Dropdown -->
        <button
          id="go-to-sections"
          (click)="toggle()"
          class="flex gap-2 items-center text-xs italic font-bold px-4 border-x"
        >
          GO TO SECTION
          <i
            [class.rotate-180]="shown"
            class="duration-300 fa-solid fa-angle-down"
          ></i>
        </button>
        <!-- end Dropdown -->
      </div>

      <ng-container *ngIf="shown">
        <ul
          @fadeIn
          (clickOutside)="close()"
          skip="#go-to-sections"
          class="absolute z-30 bg-white shadow-md w-full bottom-0 translate-y-full grid md:right-0 md:overflow-y-scroll md:max-h-[700px] md:max-w-[250px]"
        >
          <li *ngFor="let group of groups">
            <!-- Group Name -->
            <h3
              class="block italic pl-3 opacity-50 border-y py-4 text-sm font-bold uppercase"
            >
              {{ group.name }}
            </h3>
            <!-- end Group Name -->

            <!-- Types List -->
            <ul class="grid" *ngFor="let type of group.types">
              <li
                (click)="close()"
                class="border-t text-sm py-4 pl-6 cursor-pointer hover:bg-secondary-50"
              >
                {{ type }}
              </li>
            </ul>
            <!-- end Types List -->
          </li>
        </ul>
      </ng-container>
    </nav>
  `,
  animations: [fadeIn()],
  styles: [
    `
      :host {
        @apply block border-b;
      }
    `,
  ],
})
export class SubHeaderComponent implements OnInit {
  shown!: boolean;
  groups!: Group[];

  ngOnInit(): void {
    this.shown = false;
    this.groups = [
      {
        name: ResourceGroupName.LEARNING,
        types: [
          ResourceTypeName.ONLINE_COURSES,
          ResourceTypeName.INTERACTIVE_TUTORIALS,
          ResourceTypeName.PROBLEM_SOLVING,
          ResourceTypeName.READING,
          ResourceTypeName.VIDEOS,
          ResourceTypeName.PODCASTS,
          ResourceTypeName.BLOGS_COMMUNITIES,
        ],
      },
      {
        name: ResourceGroupName.WORKFLOW,
        types: [
          ResourceTypeName.DEVELOPMENT_TOOLS,
          ResourceTypeName.FRAMEWORKS_LIBRARIES,
          ResourceTypeName.RESOURCES,
          ResourceTypeName.TYPOGRAPHY,
          ResourceTypeName.COLORS,
          ResourceTypeName.MEDIA,
          ResourceTypeName.GRAPHICS,
          ResourceTypeName.INSPIRATION,
          ResourceTypeName.UTILITIES,
        ],
      },
      {
        name: ResourceGroupName.LAUNCHING,
        types: [
          ResourceTypeName.TESTING_ANALYTICS,
          ResourceTypeName.DEPLOYMENT,
          ResourceTypeName.REPORTING,
        ],
      },
    ];
  }

  /**
   * - Toggle
   */
  toggle() {
    this.shown = !this.shown;
  }

  close() {
    this.shown = false;
  }
}
