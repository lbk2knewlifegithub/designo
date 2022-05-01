import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="bg-white p-6 rounded-lg border grid gap-3">
      <h1 class="text-lg font-bold tracking-widest">PERSONAL</h1>

      <div class="grid place-items-center gap-3 mt-8">
        <!-- Image -->
        <img
          class="w-[264px] h-[264px] rounded-full object-cover"
          src="https://res.cloudinary.com/dz209s6jk/image/upload/v1649228093/Avatars/jakb5tseftxy47sebxpa.jpg"
          alt=""
        />
        <!-- end Image -->

        <!-- Choose Image -->
        <button class="btn px-10 py-2 btn-primary-outline">CHOOSE IMAGE</button>
        <!-- end Choose Image -->
      </div>

      <!-- Name -->
      <div class="sm:mt-6">
        <label class="text-sm font-medium" for="name"> Name </label>
        <br />
        <input value="Le Binh Khang" class="w-full" id="name" type="text" />
      </div>
      <!-- end Name -->

      <!-- Email* -->
      <div>
        <label class="text-sm font-medium" for="email"> Email </label>
        <br />
        <input
          value="lbk2knewlife@gmail.com"
          class="w-full"
          id="email"
          type="email"
        />
      </div>
      <!-- end Email* -->

      <!-- Slack Username* -->
      <div>
        <label class="text-sm font-medium" for="name"> Slack username </label>
        <br />
        <input
          value="Le Binh Khang"
          class="w-full"
          id="slackUsername"
          type="text"
        />
      </div>
      <!-- end Slack username* -->

      <!-- Location -->
      <div>
        <label class="text-sm font-medium" for="name">Location</label>
        <br />
        <input value="Location" class="w-full" id="location" type="text" />
      </div>
      <!-- end Location -->

      <!-- Hire Me -->
      <lbk-hire-me-input></lbk-hire-me-input>
      <!-- end Location -->

      <!-- BIO Input Group -->
      <lbk-bio-input-group class="mt-4"></lbk-bio-input-group>
      <!-- end BIO Input Group -->

      <!-- Links Input Group -->
      <lbk-links-input-group class="mt-4"></lbk-links-input-group>
      <!-- end Links Input Group -->

      <!-- Update Profile Button -->
      <div class="flex justify-end items-center mt-2">
        <button class="btn btn-error italic font-bold py-2">
          UPDATE PROFILE
        </button>
      </div>
      <!-- end Update Profile Button -->
    </form>
  `,
})
export class UserFormComponent {}
