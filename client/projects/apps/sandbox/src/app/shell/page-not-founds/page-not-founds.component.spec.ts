import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundsComponent } from './page-not-founds.component';

describe('PageNotFoundsComponent', () => {
  let component: PageNotFoundsComponent;
  let fixture: ComponentFixture<PageNotFoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
