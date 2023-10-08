import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss']
})
export class ToggleBtnComponent {
  @Input() model = true;
  @Input() trueText = 'Yes';
  @Input() falseText = 'No';
  @Output() modelChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Toggles the model value (from `true` to `false` or vice versa) and emits the updated value.
   */
  toggleModel(): void {
    this.model = !this.model;
    this.modelChange.emit(this.model);
  }
}
