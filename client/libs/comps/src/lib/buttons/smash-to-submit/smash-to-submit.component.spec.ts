import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmashToSubmitComponent } from './smash-to-submit.component';

describe('SmashToSubmitComponent', () => {
  let component: SmashToSubmitComponent;
  let fixture: ComponentFixture<SmashToSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmashToSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmashToSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
