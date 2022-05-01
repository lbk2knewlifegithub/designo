import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative overflow-hidden bg-dark bg-opacity-[88%] text-white pt-14 pb-10 md:pt-20 lg:pt-24"
    >
      <img
        class="absolute w-full h-full object-cover  inset-0 z-[-1]"
        src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/rlaxdjplmeul4qe1qvh6.jpg"
        alt=""
      />

      <div class="container-poll">
        <div class="text-center">
          <h1 class="font-bold tracking-widest">CHALLENGE HUB</h1>
          <h2 class="text-4xl mx-auto max-w-[712px] mt-3 md:mt-6 lg:text-5xl">
            Intro section with dropdown navigation
          </h2>
        </div>

        <div class="flex justify-between items-center mt-10 md:mt-16 lg:mt-20">
          <div class="flex gap-2 items-center md:gap-3">
            <span class="text-sm md:text-base"> Attemps: </span>
            <ul class="font-bold inline-flex gap-2 md:gap-3">
              <li
                class="w-10 h-10 rounded-full bg-white text-dark grid place-content-center"
              >
                1
              </li>
              <li
                class="w-10 h-10 rounded-full bg-white text-dark grid place-content-center"
              >
                2
              </li>
            </ul>
          </div>

          <!-- Follow -->
          <button
            class="btn font-bold italic tracking-widest px-10 bg-secondary-100 text-white md:px-14"
          >
            FOLLOW
          </button>
          <!-- end Follow -->
        </div>

        <p class="text-right mt-2 text-xs">
          You will automatically start to follow this challenge once you submit
          your solution
        </p>
      </div>
    </section>
  `,
})
export class HeroComponent {}
