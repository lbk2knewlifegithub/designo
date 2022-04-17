import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { identifyLink, Link } from '@lbk/models';
import { fromData } from '../../../shared';

@Component({
  selector: 'lbk-project-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <ul class="grid gap-6 2xl:grid-cols-2 2xl:gap-x-[30px]">
        <ng-container
          *ngFor="let link of links; index as i; trackBy: identifyLink"
        >
          <li
            *ngIf="skip && skip !== (link.name | slug)"
            class="relative text-white uppercase text-center rounded-[15px] h-[250px] grid place-content-center overflow-hidden z-10 md:h-[200px] 2xl:h-[308px]"
          >
            <a [routerLink]="[link.href]">
              <h2 class=" font-md text-lg md:text-xl">{{ link.name }}</h2>

              <h3 class="mt-2 text-sm tracking-[5px] md:mt-6">View Projects</h3>

              <lbk-image
                class="z-[-1] absolute inset-0"
                [image]="link.image!"
              ></lbk-image>

              <!-- mask -->
              <span class="absolute inset-0 z-[-1] bg-black opacity-70"></span>
              <!-- end mask -->
            </a>
          </li>
        </ng-container>
      </ul>
    </section>
  `,
})
export class ProjectLinksComponent implements OnInit {
  @Input() skip: string | null | undefined;

  links!: Link[];
  identifyLink = identifyLink;

  ngOnInit(): void {
    this.links = fromData.projectLinks;
  }

  shouldSkip() {
    return false;
  }
}
