import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input as InputModel } from '@lbk/models';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-links-input-group',
  templateUrl: `./links-input-group.component.html`,
})
export class LinksInputGroupComponent implements OnInit {
  @Input() parent!: FormGroup;
  inputs!: InputModel[];

  ngOnInit(): void {
    this.inputs = [
      // Github
      this.createInput(
        'github',
        'Github URL',
        'e.g. https://www.github.com/username'
      ),
      // Twitter
      this.createInput(
        'twitter',
        'Twitter URL',
        'e.g. https://www.twitter.com/username'
      ),

      // Dev.to
      this.createInput(
        'devTo',
        'Dev.to URL',
        'e.g. https://www.dev.to/username'
      ),

      // Hashnode
      this.createInput(
        'hashnode',
        'Hashnode URL',
        'e.g. https://www.hashnode.to/@username'
      ),

      // Codepen
      this.createInput(
        'codepen',
        'Codepen URL',
        'e.g. https://www.codepen.io/@username'
      ),
      // Twitch
      this.createInput(
        'twitch',
        'Twitch URL',
        'e.g. https://www.twitch.tv/username'
      ),

      // StackOverFlow
      this.createInput(
        'stackOverFlow',
        'StackOverFlow URL',
        'e.g. https://www.stackoverflow.com/username'
      ),

      // Gitlab
      this.createInput(
        'gitlab',
        'Gitlab URL',
        'e.g. https://www.gitlab.com/username'
      ),

      // FreeCodeCamp
      this.createInput(
        'freeCodeCamp',
        'freeCodeCamp URL',
        'e.g. https://www.freecodecamp.org/username'
      ),

      // Medium
      this.createInput(
        'medium',
        'Medium URL',
        'e.g. https://www.medium.com/@username'
      ),

      // LinkedIn
      this.createInput(
        'linkedIn',
        'Linkded URL',
        'e.g. https://www.linkedin.com/in/username'
      ),

      // Youtube
      this.createInput(
        'youtube',
        'Youtube URL',
        'e.g. https://www.youtube.com/channel/username'
      ),
      // Codewars
      this.createInput(
        'codewars',
        'Codewars URL',
        'e.g. https://www.codewars.com/username'
      ),
    ];
  }

  createInput(controlName: string, label: string, placeholder: string) {
    return {
      parent: this.parent,
      groupName: 'links',
      label,
      placeholder,
      controlName,
    };
  }
}
