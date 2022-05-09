import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkewButtonComponent } from './skew-button.component';

describe('SkewButtonComponent', () => {
  let component: SkewButtonComponent;
  let fixture: ComponentFixture<SkewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkewButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
