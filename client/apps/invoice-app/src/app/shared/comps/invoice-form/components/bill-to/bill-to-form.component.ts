import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormGroupComponent } from "../form-helper/form-group.component";

@Component({
  selector: "lbk-bill-to-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./bill-to.component.html",
})
export class BillToFormComponent extends FormGroupComponent {
  get address(): FormGroup {
    return this.parent.get("billTo") as FormGroup;
  }
}
