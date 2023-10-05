import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() isButton = true;
  @Input() url = '';
  @Input() label = '';
  @Input() modifier: string = '';
  @Input() disabled: boolean = false;
}
