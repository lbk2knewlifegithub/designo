import { ChangeDetectionStrategy, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { InvoiceIdComponent } from "@lbk/ui";
import { InvoiceFormTitleComponent } from ".";

describe("InvoiceFormTitleComponent", () => {
  let fixture: ComponentFixture<InvoiceFormTitleComponent>;
  let component: InvoiceFormTitleComponent;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceIdComponent, InvoiceFormTitleComponent],
    })
      .overrideComponent(InvoiceIdComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .overrideComponent(InvoiceFormTitleComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(InvoiceFormTitleComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("id default should be undefine", () => {
    expect(component.id).toBeFalsy();
  });

  it("should contain New Invoice when id undefine", () => {
    const h2 = de.query(By.css("h2")).nativeElement;
    expect(h2.textContent).toContain("New Invoice");
  });

  it('should contain "Edit #id" when id defined', fakeAsync(() => {
    component.id = "banana";
    fixture.detectChanges();
    const textContent = de.nativeElement.textContent;
    expect(textContent).toContain("Edit # BANANA");
  }));
});
