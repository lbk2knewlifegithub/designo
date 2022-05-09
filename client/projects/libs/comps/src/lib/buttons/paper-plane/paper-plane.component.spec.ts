import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperPlaneComponent } from './paper-plane.component';

describe('PaperPlaneComponent', () => {
  let component: PaperPlaneComponent;
  let fixture: ComponentFixture<PaperPlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperPlaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperPlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
