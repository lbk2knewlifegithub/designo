import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from '@lbk/models';

interface Project {
  name: string;
  image: Image;
}

@Component({
  selector: 'lbk-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container grid gap-6">
      <div
        *ngFor="let project of projects; trackBy: identifyProject"
        class="relative text-white uppercase text-center rounded-[15px] h-[250px] grid place-content-center overflow-hidden z-10 md:h-[200px]"
      >
        <h2 class=" font-md text-lg md:text-xl">{{ project.name }}</h2>

        <h3 class="mt-2 text-sm tracking-[5px] md:mt-6">View Projects</h3>

        <lbk-image
          class="z-[-1] absolute inset-0"
          [image]="project.image"
        ></lbk-image>

        <!-- mask -->
        <span class="absolute inset-0 z-[-1] bg-black opacity-70"></span>
        <!-- end mask -->
      </div>
    </section>
  `,
})
export class ProjectsComponent implements OnInit {
  projects!: Project[];

  ngOnInit(): void {
    this._initProjects();
  }

  private _initProjects() {
    this.projects = [
      /// Web Design
      {
        name: 'Web Design',
        image: {
          mobile: 'assets/home/mobile/image-web-design.jpg',
          tablet: 'assets/home/tablet/image-web-design.jpg',
          desktop: 'assets/home/desktop/image-web-design.jpg',
          alt: 'Web Design Desktop',
        },
      },

      /// App Design
      {
        name: 'App Design',
        image: {
          mobile: 'assets/home/mobile/image-app-design.jpg',
          tablet: 'assets/home/tablet/image-app-design.jpg',
          desktop: 'assets/home/desktop/image-app-design.jpg',
          alt: 'App Design Desktop',
        },
      },

      /// Graphic Design
      {
        name: 'Graphic Design',
        image: {
          mobile: 'assets/home/mobile/image-graphic-design.jpg',
          tablet: 'assets/home/tablet/image-graphic-design.jpg',
          desktop: 'assets/home/desktop/image-graphic-design.jpg',
          alt: 'Graphic Design',
        },
      },
    ];
  }

  identifyProject(index: number, project: Project) {
    return project.name;
  }
}
