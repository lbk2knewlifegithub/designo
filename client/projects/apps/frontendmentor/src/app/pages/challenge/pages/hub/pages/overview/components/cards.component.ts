import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll pt-14 lg:pt-16 xl:pt-20">
      <ul
        class="grid gap-10 md:grid-cols-2 md:gap-x-5 md:gap-y-14 xl:grid-cols-3"
      >
        <!-- Download Starter Files -->
        <li>
          <lbk-card index="1">
            <div>
              <h2 class="text-2xl font-medium">Download starter files</h2>

              <p class="mt-2 text-sm md:mt-4">
                Includes assets, JPG images of the design files and a basic
                style guide. There’s also a README to help you get started.
              </p>
            </div>

            <div class="mt-2 md:mt-4">
              <button
                class="btn btn-icon btn-error font-bold gap-4 px-8 italic"
              >
                DOWNLOAD STARTER
                <i class="fa-solid fa-cloud-arrow-down"></i>
              </button>
            </div>
          </lbk-card>
        </li>
        <!-- end Download Starter Files -->

        <!-- Download Design File -->
        <li>
          <lbk-card index="2">
            <div>
              <h2 class="text-2xl font-medium">Download design file</h2>

              <p class="mt-2 text-sm md:mt-4">
                Choose between Sketch or Figma (or choose both!). The design
                file will help you see exactly what styles are needed.
              </p>
            </div>

            <ul class="flex gap-2 mt-3 md:mt-4">
              <li>
                <button
                  class="btn btn-icon btn-primary font-bold gap-2 px-8 italic"
                >
                  SKETCH
                  <i class="fa-solid fa-cloud-arrow-down"></i>
                </button>
              </li>

              <li>
                <button
                  class="btn btn-icon btn-primary font-bold gap-2 px-8 italic"
                >
                  FIGMA
                  <i class="fa-solid fa-cloud-arrow-down"></i>
                </button>
              </li>
            </ul>
          </lbk-card>
        </li>
        <!-- end Download Design File -->

        <!-- Submit Your Solution -->
        <li class="md:col-span-2 xl:col-span-1">
          <lbk-card class="primary" index="3">
            <div>
              <h2 class="text-2xl font-medium">Submit your solution</h2>

              <p class="mt-2 text-sm md:mt-4">
                Once you’ve completed the challenge, you can submit your
                solution. Remember to ask questions if you’d like feedback!
              </p>
            </div>

            <div class="mt-3 md:mt-4">
              <button
                class="btn btn-icon btn-white font-bold gap-2 px-8 italic"
              >
                SUBMIT SOLUTION
              </button>
            </div>
          </lbk-card>
        </li>
        <!-- end Submit Your Solution -->
      </ul>
    </section>
  `,
})
export class CardsComponent {}
