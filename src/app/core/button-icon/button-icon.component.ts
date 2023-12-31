import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent {
  @Input() icon?: string;
  @Input() url?: string;
  @Input() modifier?: string;
}
