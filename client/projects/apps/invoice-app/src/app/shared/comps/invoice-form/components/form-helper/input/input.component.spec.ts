import { ChangeDetectionStrategy } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let input: InputComponent;
  let inputElement: HTMLInputElement;
  let labelElement: HTMLLabelElement;
  let de: DebugElement;

  const groupName = 'test';
  const controlName = 'test';
  const placeHolder = 'test';
  const label = 'test';
  const inputType = 'text';

  const fb = new FormBuilder();
  const formGroup = fb.group({
    [groupName]: fb.group({
      [controlName]: ['', Validators.required],
    }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule],
    })
      .overrideComponent(InputComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(InputComponent);
    input = fixture.componentInstance;

    input.controlName = controlName;
    input.placeHolder = placeHolder;
    input.label = label;
    input.inputType = inputType;
    input.parent = formGroup;
    input.groupName = groupName;

    de = fixture.debugElement;

    fixture.detectChanges();

    inputElement = de.query(By.css('input')).nativeElement;
    labelElement = de.query(By.css('label')).nativeElement;
  });

  it('should create', () => {
    expect(input).toBeTruthy();
  });

  describe('input element', () => {
    it('should have value empty', () => {
      expect(inputElement.value).toBe('');
    });

    it('should have border class is border-danger-900 when error and dirty', () => {
      const formControl = input.formControl;
      formControl.setValue('');
      formControl.markAsDirty();
      fixture.detectChanges();

      expect(formControl.hasError('required')).toBeTruthy();
    });
  });

  describe('label element', () => {
    it('should have text content titlecase "Test"', () => {
      expect(labelElement.textContent).toBe('Test');
    });
  });
});
