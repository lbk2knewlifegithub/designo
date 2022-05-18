import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solution, SolutionDTO, Tag } from '@lbk/fm/shared';
import * as MyValidator from '@lbk/validators';
import { DialogService } from '@ngneat/dialog';
import { AboutPrivateSolutionsComponent } from '../about-private-solution.component';

@Component({
  selector: 'lbk-solution-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-form.component.html',
})
export class SubmitFormComponent implements OnInit {
  @Input() solution: Solution | null | undefined;
  @Input() tags!: Tag[];
  @Input() submitingSolution!: boolean;
  @Input() updatingSolution!: boolean;

  @Output() createSolution = new EventEmitter<SolutionDTO>();
  @Output() updateSolution = new EventEmitter<SolutionDTO>();
  @Output() deleteSolution = new EventEmitter<string>();

  form!: FormGroup;

  constructor(
    private readonly _ds: DialogService,
    private readonly _fb: FormBuilder
  ) {}

  ngOnInit() {
    this._initForm();
    this.form.valueChanges.subscribe(console.log);
  }

  private _initForm() {
    const { repoURL, liveSiteURL, tags, isPrivate, questions, title } = this
      .solution || {
      title: 'Fullstack Challenge what the fuck',
      repoURL: 'https://countries-sveltekit-lbk2knewlifegithub.vercel.app/',
      liveSiteURL: 'https://countries-sveltekit-lbk2knewlifegithub.vercel.app/',
      questions: "What's your question?",
    };

    this.form = this._fb.group({
      title: [title, [Validators.maxLength(70), Validators.required]],
      repoURL: [repoURL, [MyValidator.URL, Validators.required]],
      liveSiteURL: [liveSiteURL, [MyValidator.URL, Validators.required]],
      tags: [tags || []],
      questions: [questions, [Validators.maxLength(500)]],
      isPrivate: [isPrivate],
    });

    this.form.valueChanges.subscribe(console.log);
  }

  /**
   * - Show About Private Solution
   */
  showAboutPrivateSolution() {
    this._ds.open(AboutPrivateSolutionsComponent);
  }

  /**
   * - Submit Solution
   */
  submitOrUpdate() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return this._ds.error('Form is invalid');
    }

    // Submit Solution
    if (!this.solution) {
      return this.createSolution.emit(this.form.value);
    }

    // Update Solution
    return this.updateSolution.emit(this.form.value);
  }

  deleteButtonClick() {
    if (!this.solution) {
      this.form.reset({});
      return;
    }

    this.deleteSolution.emit(this.solution.id);
  }
}
