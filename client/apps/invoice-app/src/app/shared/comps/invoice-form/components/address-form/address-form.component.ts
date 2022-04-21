import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent {
  @Input() displayTitle = true;
  @Input() parent!: FormGroup;
  @Input() groupName!: string;
}
