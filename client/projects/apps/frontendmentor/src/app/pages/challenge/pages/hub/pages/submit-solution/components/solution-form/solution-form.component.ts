import { createAction } from '@ngrx/store';
import { Solution, CreateSolutionDTO } from '@lbk/fm/shared';
import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as MyValidator from '@lbk/validators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { AboutPrivateSolutionsComponent } from '../about-private-solution.component';

@Component({
  selector: 'lbk-solution-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-form.component.html',
})
export class SubmitFormComponent implements OnInit {
  @Input() solution: Solution | null | undefined;
  @Output() createSolution = new EventEmitter<CreateSolutionDTO>();

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
    const { repoURL, liveSiteURL, tags, isPrivate, questions, title } =
      this.solution || {};

    this.form = this._fb.group({
      title: [title, [Validators.maxLength(70), Validators.required]],
      repoURL: [repoURL, [MyValidator.URL, Validators.required]],
      liveSiteURL: [liveSiteURL, [MyValidator.URL, Validators.required]],
      tags: [tags],
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
  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return this._ds.error('Form is invalid');
    }

    if (!this.solution) return this.createSolution.emit(this.form.value);
    return;
  }

  /**
   * - Delete Solution
   */
  deleteSolution() {}
}
