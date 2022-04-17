import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { identifyLink, Link } from '@lbk/models';
import { fromData } from '../../../shared';

@Component({
  selector: 'lbk-project-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <ul class="grid gap-6 2xl:grid-cols-2 2xl:grid-rows-2 2xl:gap-x-[30px]">
        <ng-container
          *ngFor="let link of links; index as i; trackBy: identifyLink"
        >
          <li
            [ngClass]="{
              '2xl:row-span-2 2xl:h-[640px]': i === 0,
              '2xl:col-span-1 2xl:col-start-2 2xl:row-span-1 2xl:min-h-[308px]':
                i === 1,
              '2xl:col-span-1 2xl:col-start-2 2xl:row-start-2 2xl:h-full':
                i === 2
            }"
            class="relative h-[250px] grid place-content-center text-white uppercase text-center rounded-[15px] overflow-hidden md:h-[200px]"
          >
            <div>
              <!-- Background Image -->
              <lbk-image
                class="z-[-1] absolute inset-0 "
                [image]="link.image!"
              ></lbk-image>
              <!-- end Background Image -->

              <div>
                <h2 class=" font-md text-lg md:text-xl">{{ link.name }}</h2>

                <a
                  [routerLink]="[link.href]"
                  class="peer block mt-2 text-sm tracking-[5px] md:mt-6 hover:underline"
                >
                  View Projects
                </a>

                <!-- mask -->
                <span
                  class="duration-300 absolute inset-0 z-[-1] bg-black opacity-70 peer-hover:bg-peach-200"
                ></span>
                <!-- end mask -->
              </div>
            </div>
          </li>
        </ng-container>
      </ul>
    </section>
  `,
})
export class ProjectLinksComponent implements OnInit {
  links!: Link[];
  identifyLink = identifyLink;

  ngOnInit(): void {
    this.links = fromData.projectLinks;
  }

  shouldSkip() {
    return false;
  }
}
