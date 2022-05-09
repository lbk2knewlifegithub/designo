import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-links-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="font-bold">LINKS</h2>

    <ul class="mt-1 grid gap-4">
      <!-- Github URL -->
      <li>
        <label class="text-sm font-medium" for="github">Github URL</label>
        <br />

        <input
          placeholder="e.g. https://www.github.com/username"
          class="w-full"
          id="github"
          type="text"
        />
      </li>
      <!-- end Github URL -->

      <!-- Twitter URL -->
      <li>
        <label class="text-sm font-medium" for="twitter">Twitter URL</label>
        <br />

        <input
          placeholder="e.g. https://www.twitter.com/username"
          class="w-full"
          id="twitter"
          type="text"
        />
      </li>
      <!-- end Twitter URL -->

      <!-- Dev.to URL -->
      <li>
        <label class="text-sm font-medium" for="dev.to">Dev.to URL</label>
        <br />

        <input
          placeholder="e.g. https://www.dev.to/username"
          class="w-full"
          id="dev.to"
          type="text"
        />
      </li>
      <!-- end Dev.to URL -->

      <!-- Hashnode URL -->
      <li>
        <label class="text-sm font-medium" for="website">Hashnode URL</label>
        <br />

        <input
          placeholder="e.g. https://www.hashnode.to/@username"
          class="w-full"
          id="hashnode"
          type="text"
        />
      </li>
      <!-- end Hashnode URL -->

      <!-- CodePen URL -->
      <li>
        <label class="text-sm font-medium" for="codepenio">CodePen URL</label>
        <br />

        <input
          placeholder="e.g. https://www.codepen.io/@username"
          class="w-full"
          id="codepenio"
          type="text"
        />
      </li>
      <!-- end CodePen URL -->

      <!-- Twitch -->
      <li>
        <label class="text-sm font-medium" for="twitch">Twitch</label>
        <br />

        <input
          placeholder="e.g. https://www.twitch.tv/username"
          class="w-full"
          id="twitch"
          type="text"
        />
      </li>
      <!-- end Twitch -->

      <!-- StackOverFlow URL -->
      <li>
        <label class="text-sm font-medium" for="stackoverflow"
          >StackOverFlow URL</label
        >
        <br />

        <input
          placeholder="e.g. https://www.stackoverflow.com/username"
          class="w-full"
          id="stackoverflow"
          type="text"
        />
      </li>
      <!-- end StackOverFlow URL -->

      <!-- Gitlab URL -->
      <li>
        <label class="text-sm font-medium" for="gitlab">Gitlab URL</label>
        <br />

        <input
          placeholder="e.g. https://www.gitlab.com/username"
          class="w-full"
          id="gitlab"
          type="text"
        />
      </li>
      <!-- end Gitlab URL -->

      <!-- freeCodeCamp URL -->
      <li>
        <label class="text-sm font-medium" for="freecodecamp"
          >freeCodeCamp URL</label
        >
        <br />

        <input
          placeholder="e.g. https://www.freecodecamp.org/username"
          class="w-full"
          id="freecodecamp"
          type="text"
        />
      </li>
      <!-- end freeCodeCamp URL -->

      <!-- Medium URL -->
      <li>
        <label class="text-sm font-medium" for="medium">Medium URL</label>
        <br />

        <input
          placeholder="e.g. https://www.medium.com/@username"
          class="w-full"
          id="medium"
          type="text"
        />
      </li>
      <!-- end Medium URL -->

      <!-- LinkedIn URL -->
      <li>
        <label class="text-sm font-medium" for="linkedin">LinkedIn URL</label>
        <br />

        <input
          placeholder="e.g. https://www.linkedin.com/in/username"
          class="w-full"
          id="linkedin"
          type="text"
        />
      </li>
      <!-- end LinkedIn URL -->

      <!-- Youtube URL -->
      <li>
        <label class="text-sm font-medium" for="youtube">Youtube URL</label>
        <br />

        <input
          placeholder="e.g. https://www.youtube.com/channel/username"
          class="w-full"
          id="youtube"
          type="text"
        />
      </li>
      <!-- end Youtube URL -->

      <!-- Codewars URL -->
      <li>
        <label class="text-sm font-medium" for="codewars">Codewars URL</label>
        <br />

        <input
          placeholder="e.g. https://www.codewars.com/username"
          class="w-full"
          id="codewars"
          type="text"
        />
      </li>
      <!-- end Youtube URL -->
    </ul>
  `,
})
export class LinksInputGroupComponent {}
