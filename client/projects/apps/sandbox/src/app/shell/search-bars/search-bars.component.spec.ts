import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarsComponent } from './search-bars.component';

describe('SearchBarsComponent', () => {
  let component: SearchBarsComponent;
  let fixture: ComponentFixture<SearchBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
