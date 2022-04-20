import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-address-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent {
  @Input() displayTitle = true;
  @Input() parent!: FormGroup;
  @Input() groupName!: string;
}
