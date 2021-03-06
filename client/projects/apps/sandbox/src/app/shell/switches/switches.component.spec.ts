import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchesComponent } from './switches.component';

describe('SwitchsComponent', () => {
  let component: SwitchesComponent;
  let fixture: ComponentFixture<SwitchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
