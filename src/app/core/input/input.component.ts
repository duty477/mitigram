import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() model = '';
  @Input() name = '';
  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Updates the model value and emits the updated value.
   * @param {string} value - The new value to set for the model.
   */
  changeModel(value: string): void {
    this.modelChange.emit(value);
  }
}
