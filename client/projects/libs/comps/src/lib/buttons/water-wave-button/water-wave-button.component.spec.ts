import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterWaveButtonComponent } from './water-wave-button.component';

describe('WaterWaveButtonComponent', () => {
  let component: WaterWaveButtonComponent;
  let fixture: ComponentFixture<WaterWaveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterWaveButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterWaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
